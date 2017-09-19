<?php
$to="AAAAsMVyCtw:APA91bGpqnGin3mDOM_vxZqoA6SaTLtE848SsB5qlBEhNM-gS2M-wnmCLoGmjaTWI2ihf9uiQQFvl4ABY1ULd-n7Rc8MrYwcPAqT4cONC5aetwViB7dM97uQSai_XEjW1-SkcD5D8YYZ";
$title="Push Notification";
$message="Messaged pushed";
sendPush($to,$title,$message);

function sendPush($to,$title,$message)
{
// API access key from Google API's Console
// replace API
define( 'API_ACCESS_KEY', 'AIzaSyA3a--Sgvxgojn7VZl_vaMPOt4syuIoeOE');
$registrationIds = array($to);
$msg = array
(
'message' => $message,
'title' => $title,
'vibrate' => 1,
'sound' => 1

// you can also add images, additionalData
);
$fields = array
(
'registration_ids' => $registrationIds,
'data' => $msg
);
$headers = array
(
'Authorization: key=' . API_ACCESS_KEY,
'Content-Type: application/json'
);
$ch = curl_init();
curl_setopt( $ch,CURLOPT_URL, 'https://android.googleapis.com/gcm/send' );
curl_setopt( $ch,CURLOPT_POST, true );
curl_setopt( $ch,CURLOPT_HTTPHEADER, $headers );
curl_setopt( $ch,CURLOPT_RETURNTRANSFER, true );
curl_setopt( $ch,CURLOPT_SSL_VERIFYPEER, false );
curl_setopt( $ch,CURLOPT_POSTFIELDS, json_encode( $fields ) );
$result = curl_exec($ch );
curl_close( $ch );
echo $result;
}
?>