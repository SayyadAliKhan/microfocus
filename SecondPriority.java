import java.io.File;
import java.io.FileNotFoundException;
import java.util.*;

public class SecondPriority implements Runnable {

    private static PriorityQueue<UserInfomation> pQueue;

    private class UserInfomation {

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
    }

    class UserInformationSort implements Comparator<UserInfomation> {

        @Override
        public int compare(UserInfomation o1, UserInfomation o2) {
            return o1.getDateTime().compareTo(o2.getDateTime());
        }

    }

    public static void main(String[] args) {
        try {
            Scanner scanner = new Scanner(new File("./input.txt"));
            secondPriority(scanner);
            scanner.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void run() {
        synchronized (pQueue) {
            System.out.println();
            System.out.println("Thread ID Person ID Month Day Year");
            Iterator iterator = pQueue.iterator();
            while (iterator.hasNext()) {
                UserInfomation user = (UserInfomation) iterator.next();
                System.out.print(Thread.currentThread().getName() + ":   ");
                System.out.println(user.userid + "      " + user.month + "    " + user.day + "  " + user.year);
            }
        }

    }

    private static void secondPriority(Scanner scanner){
        SecondPriority secondPriority = new SecondPriority();
        pQueue = new PriorityQueue<>(12, secondPriority.new UserInformationSort());
      while (scanner.hasNextLine()) {
          String str = scanner.nextLine().trim().replaceAll("\\s+", " ");
          String[] line = str.split(" ");
          if (line.length == 4){
                UserInfomation userInfo = secondPriority.new UserInfomation(line[0], line[1], line[2], line[3]);
            pQueue.add(userInfo);
          }
      }

      Thread thread1 = new Thread(new SecondPriority());
      Thread thread2 = new Thread(new SecondPriority());
      thread1.setName("Thread 1");
      thread2.setName("Thread 2");
      thread1.start();
      thread2.start();
        
      System.out.println("Time Complexity: O(nlogn)")) // where n is the no of records
      System.out.println("Space Complexity: O(n)"))
    }
}
