import { PostController } from "../../controllers/post.controllers";
import { SpellingController } from "../../controllers/spelling.controller";
import { getTodayDate } from "../../helpers/getTodayDate";
import { capitalizeFirstLetter } from "../../helpers/string-helpers";
import { RequestCreatePost, ResponseCreatePost } from "../../models/post.model";
import { loader } from "../loader/loader.component";
import { showModal } from "../modals/modal.component";
import "./create-post.component.css";

export function createPost() {
    //HTML Element of Modal
    const $modalContainer = document.createElement('div');
    $modalContainer.id = 'modal-container';
    $modalContainer.className = 'modal-container';
    $modalContainer.style.display = 'none';
  
    const $modalContent = document.createElement('div');
    $modalContent.className = 'modal-content';
  
    const $closeButton = document.createElement('span');
    $closeButton.className = 'close-button';
    $closeButton.id = 'close-button';
    $closeButton.innerHTML = '&times;';
  
    const $modalMessage = document.createElement('div');
    $modalMessage.id = 'modal-message';
    
    //Jerarquia of Modal
    $modalContent.appendChild($closeButton);
    $modalContent.appendChild($modalMessage);
    $modalContainer.appendChild($modalContent);
    
    //Display Modal when click on it.
    const $root = document.getElementById("root") as HTMLElement;
    $root.appendChild($modalContainer);
  

    // Logic to post
    if ($modalContainer && $modalMessage && $closeButton) {
      const $createForm = document.createElement('form');
      $createForm.id = 'create-form';

      //HTML Input Elements 
      const $title = document.createElement('input');
      $title.type = 'text';
      $title.name = 'title';
      $title.id = 'title';
      $title.placeholder = 'Enter a new title name';
      $title.maxLength = 20;
  
      const $body = document.createElement('input');
      $body.type = 'text';
      $body.name = 'body';
      $body.id = 'body';
      $body.placeholder = 'Enter the body';
      $body.maxLength = 200;
      
      const $creator = document.createElement('input');
      $creator.type = 'text';
      $creator.name = 'platform';
      $creator.id = 'platform';
      $creator.placeholder = 'Enter a the name of creator';
      $creator.maxLength = 20;

      const $estimatedDate = document.createElement('input');
      $estimatedDate.type = 'date';
      $estimatedDate.name = 'estimatedDate';
      $estimatedDate.id = 'estimatedDate';
      const $labelEstimatedDate = document.createElement('label') as HTMLLabelElement;
      $labelEstimatedDate.innerText='Estimated Publication Date';

      const $platform = document.createElement('select');
      $platform.name = 'platform';
      $platform.id = 'platform';
      
      const $optionFacebook = document.createElement('option');
      $optionFacebook.value = 'Facebook';
      $optionFacebook.innerText='Facebook';

      const $optionInstagram = document.createElement('option');
      $optionInstagram.value = 'Instagram';
      $optionInstagram.innerText='Instagram';

      const $optionX = document.createElement('option');
      $optionX.value = 'X';
      $optionX.innerText='X';


      const $postUrl = document.createElement('input');
      $postUrl.type = 'url';
      $postUrl.name = 'postUrl';
      $postUrl.id = 'postUrl';
      $postUrl.placeholder = 'Enter a post url';
     
      //Buttons Form
      const $actionButtons = document.createElement('div');
      $actionButtons.className = 'action-buttons-create';
  
      const $createButton = document.createElement('button');
      $createButton.type = 'submit';
      $createButton.id = 'create';
      $createButton.textContent = 'Create';
  
      const $cancelButton = document.createElement('button');
      $cancelButton.id = 'cancel';
      $cancelButton.type = 'button';
      $cancelButton.textContent = 'Cancel';
  
      $actionButtons.appendChild($createButton);
      $actionButtons.appendChild($cancelButton);


      //Jerarquia de etiquetas HTML del formulario
      $createForm.appendChild($title);
      $createForm.appendChild($body);
      $createForm.appendChild($creator);
      $createForm.appendChild($labelEstimatedDate);
      $createForm.appendChild($estimatedDate);
      $createForm.appendChild($platform);
      $platform.appendChild($optionFacebook);
      $platform.appendChild($optionInstagram);
      $platform.appendChild($optionX);
      $createForm.appendChild($postUrl);
      $createForm.appendChild($actionButtons);
  
      $modalMessage.appendChild($createForm);
    
      //Events
      $modalContainer.style.display = "flex";
  
      $cancelButton.onclick = () => {
        $modalContainer.style.display = "none";
      };
  
      $closeButton.onclick = () => {
        $modalContainer.style.display = "none";
      };
  
      window.onclick = (event) => {
        if (event.target === $modalContainer) {
          $modalContainer.style.display = "none";
        }
      };

    //Logic to Post Request
    //Instantiate title
    const post:PostController=new PostController();
    const spelling:SpellingController= new SpellingController();

    $createForm.addEventListener('submit',async(e) => {
        e.preventDefault();
        if($title.value && $body.value && $platform.value && $creator.value && $estimatedDate.value && $postUrl.value){
        //Data to validate progress
        try {
        const errorSpelling = await spelling.errors($body.value);
        let progres= (errorSpelling/$body.value.split(' ').length)*100;
        errorSpelling ==0? progres=100:progres= (errorSpelling/$body.value.split(' ').length)*100;
        //Data to create city
        const dataToCreate:RequestCreatePost={
          title:`${$title.value}`,
          body:`${$body.value}`,
          creationDate:getTodayDate(new Date()),
          creator:`${$creator.value}`,
          estimatedPublicationDate: getTodayDate(new Date($estimatedDate.value)),
          status:`pending`,
          approvalPercentage:progres,
          corrections:`${errorSpelling}`,
          platform:`${$platform.value}`,
          postUrl:`${$postUrl.value}`,
          multimediaUrl:`${$postUrl.value}`
        }
        try {
            loader(true);
            const responsePost:ResponseCreatePost = await post.createPost(dataToCreate);
            loader(false);
            if(responsePost){
            window.location.reload();
            showModal(`${capitalizeFirstLetter(responsePost.title)} created successfully`);
            }
        } catch (error) {
            loader(false);
            showModal(`${error}`);
        }
        } catch (error) {
          showModal(`${error}`)
        }
        
        }else{
        showModal("Please fill in all fields");
        throw new Error("Please fill in all fields");
        }
    });

    }
  }
  