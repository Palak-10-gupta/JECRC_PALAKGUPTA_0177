//Delegate Notifiction System

namespace NotificationSystem
{ 

// 1️⃣ Create a delegate
public delegate void NotificationSender(string message);

// 2️⃣ Create Notifiers class
public class Notifiers
{
    public static void SendEmail(string message)
    {
        Console.WriteLine(message);
    }

    public static void SendSMS(string message)
    {
        Console.WriteLine(message);
    }

    public static void SendPushNotification(string message)
    {
        Console.WriteLine(message);
    }
}

// 3️⃣ Create NotificationManager class
public class NotificationManager
{
    public void NotifyUser(string message, NotificationSender sender)
    {
        // Invoke the delegate
        sender(message);
    }
}

    // 4️⃣ Main Method
    class Program
    {
        static void Main(string[] args)
        {
            NotificationManager manager = new NotificationManager();

            // Send Email
            manager.NotifyUser("Welcome via Email!", Notifiers.SendEmail);

            // Send SMS
            manager.NotifyUser("Welcome via SMS!", Notifiers.SendSMS);

            // Send Push Notification
            manager.NotifyUser("Welcome via Push Notification!", Notifiers.SendPushNotification);

            Console.ReadLine();
        }
    }
}

