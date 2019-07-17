import java.io.File;
import java.io.FileNotFoundException;
import java.util.*;

public class SortByDate implements Runnable{

    private static List<UserInfomation> list;
    private class UserInfomation implements Comparable<UserInfomation> {
        
        private String userid;
        private int day;
        private int month;
        private int year;
        private Date dateTime;

        public UserInfomation(String userid, String month, String day, String year) {
            this.userid = userid;
            this.day = Integer.parseInt(day);
            this.month = Integer.parseInt(month);
            this.year = Integer.parseInt(year);
            Calendar c = Calendar.getInstance();
            c.set(this.year, this.month - 1, this.day, 0, 0);
            this.dateTime = c.getTime();
        }

        public Date getDateTime() {
            return dateTime;
        }

        @Override
        public int compareTo(UserInfomation o) {
            if (getDateTime() == null || o.getDateTime() == null)
                return 0;
            return getDateTime().compareTo(o.getDateTime());
        }
    }

    public static void main(String[] args) {
        try {
            Scanner scanner = new Scanner(new File("./input.txt"));
            firstPriority(scanner);
            scanner.close();

        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void run() {
        synchronized (list) {
            System.out.println();
            System.out.println("Thread ID Person ID Month Day Year");
            for(UserInfomation user : list){
                System.out.print(Thread.currentThread().getName() + ":   ");
                System.out.println(user.userid + "      " + user.month + "    " + user.day + "  " + user.year );
            }
        }

    }

    private static void firstPriority(Scanner scanner){
      SortByDate sortByDate = new SortByDate();
      list = Collections.synchronizedList(new ArrayList<>());
      while (scanner.hasNextLine()) {
          String str = scanner.nextLine().trim().replaceAll("\\s+", " ");
          String[] line = str.split(" ");
          if (line.length == 4){
              UserInfomation userInfo = sortByDate.new UserInfomation(line[0], line[1], line[2], line[3]);
              list.add(userInfo);
          }
      }
      list.sort(Comparator.comparing(o -> o.getDateTime()));
      Thread thread1 = new Thread(new SortByDate());
      Thread thread2 = new Thread(new SortByDate());
      thread1.setName("Thread 1");
      thread2.setName("Thread 2");
      thread1.start();
      thread2.start();
    }
}
