<?php

//sanitize the data
function valid_donnees($donnees){
    $donnees = trim($donnees); //suppress useless spaces
    $donnees = stripslashes($donnees);//suppress the antislash
    $donnees = htmlspecialchars($donnees); //suppress the stripes
    return $donnees;
}
// function validate the captcha
function validCaptcha(){

    if(isset($_POST["recaptchaResponse"]) && !empty($_POST["recaptchaResponse"])){
        $recaptcha_url = 'https://www.google.com/recaptcha/api/siteverify'; // URL to the reCAPTCHA server
            $recaptcha_secret = 'secret'; // Secret key (here demo)
            $recaptcha_response=$_POST["recaptchaResponse"];
            $recaptcha = file_get_contents($recaptcha_url.'?secret='.$recaptcha_secret.'&response='.$recaptcha_response); // Send request to the server
            $recaptcha = json_decode($recaptcha); // Decode the JSON response
            if($recaptcha->success == true ){ // If the response is valid
               
                return true; // Success message
            }else{
                return false; // Error message
            }
    }else{
        return false;
    }
} 
    
    
if(validCaptcha()){
    if(isset($_POST["nom"]) && !empty($_POST["nom"])&&
    isset($_POST["email"]) && !empty($_POST["email"])){

        // if the email is valid
        if(filter_var($_POST["email"], FILTER_VALIDATE_EMAIL)){
  
                    //sanitize the data
                   
                    $nom= valid_donnees($_POST["nom"]);
                        $message= valid_donnees($_POST["message"]);
                   
                    
                    //prepare the mail content
                    $contenu= "Ce message vous a été envoyé via la page de contact du site SMECRI.fr
                        
                        Nom:".$nom."
                        Message:".$message;

                    //send the mail
                    $retour = mail("charlot.alicia3103@gmail.com","Le formulaire de contact a été rempli par ".$_POST["nom"],$contenu,"FROM:contact@devandcookies.fr\r\nReply-to:".$_POST["email"]);
                    
                    // if the mail has be correctly send 
                    if($retour){
                        echo "L'email a bien été envoyé.";
                       
                    //email not send   
                    }else{
                        echo "Désolé l'email n'a pas pu être envoyé. Veuillez réessayer plus tard";
                    }
               

        //mail invalid   
        }else{
            echo 'veuillez remplir un email valide';
        }
        
    //need to fill all the form
    }else{
        echo 'Vous devez remplir les champs *';
    }
//recaptcha not valid    
}else{
    echo "Captcha Invalide, veuillez réessayer ultérieurement";
}
    
?>