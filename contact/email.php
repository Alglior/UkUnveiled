<?php
if(isset($_POST['contact_submitted'])) {
    // Retrieve form data
    $name = $_POST['your_name'];
    $email = $_POST['your_email'];
    $message = $_POST['your_enquiry'];

    // Validate form data
    if(empty($name) || empty($email) || empty($message)) {
        header ("Location : fill_all_field.php");
    } else {
        // Set up email parameters
        $to = "arthur.thibaudon@gmail.com"; // Replace with your own email address
        $subject = "New Contact Form Submission";
        $headers = "From: $name <$email>" . "\r\n" .
                   "Reply-To: $email" . "\r\n" .
                   "X-Mailer: PHP/" . phpversion();

        // Send email
        if(mail($to, $subject, $message, $headers)) {
            header ("Location : success.php");
        } else {
            header ("Location : error.php");
        }
    }
}
?>
