import { CitiesController } from "../../controllers/post.controllers";
import { getTodayDate } from "../../helpers/getTodayDate";
import { capitalizeFirstLetter } from "../../helpers/string-helpers";
import { CreateCity } from "../../models/post.model";
import { loader } from "../loader/loader.component";
import { showModal } from "../modals/modal.component";
import './update-city.component.css';

export function editCity(userCity:string,userCountry:string,userReason:string) {
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
  

    // Logic to put
    if ($modalContainer && $modalMessage && $closeButton) {
      const $editForm = document.createElement('form');
      $editForm.id = 'edit-form';

      //HTML Input Elements 
      const $cityName = document.createElement('input');
      $cityName.type = 'text';
      $cityName.name = 'city';
      $cityName.id = 'city';
      $cityName.placeholder = `${userCity}`;
      $cityName.maxLength = 20;
  
      const $country = document.createElement('input');
      $country.type = 'text';
      $country.name = 'country';
      $country.id = 'country';
      $country.placeholder = `${userCountry}`;
      $country.maxLength = 20;
  
      const $reason = document.createElement('input');
      $reason.type = 'text';
      $reason.name = 'reason';
      $reason.id = 'reason';
      $reason.placeholder = `${userReason}`;
      $reason.maxLength = 20;
  
     
      //Buttons Form
      const $actionButtons = document.createElement('div');
      $actionButtons.className = 'action-buttons-create';
  
      const $editButton = document.createElement('button');
      $editButton.type = 'submit';
      $editButton.id = 'create';
      $editButton.textContent = 'Edit';
  
      const $cancelButton = document.createElement('button');
      $cancelButton.id = 'cancel';
      $cancelButton.type = 'button';
      $cancelButton.textContent = 'Cancel';
  
      $actionButtons.appendChild($editButton);
      $actionButtons.appendChild($cancelButton);


      //Jerarquia de etiquetas HTML del formulario
      $editForm.appendChild($cityName);
      $editForm.appendChild($country);
      $editForm.appendChild($reason);
      $editForm.appendChild($actionButtons);
  
      $modalMessage.appendChild($editForm);
    
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

    //Logic to Put Request
    //Instantiate City
    const city:CitiesController=new CitiesController();

    $editForm.addEventListener('submit',async(e) => {
        e.preventDefault();
        if($cityName.value || $country.value || $reason.value){
        //Data to update city
        const dataToEdit:CreateCity={
            name:`${$cityName.value?$cityName.value:userCity}`,
            country: `${$country.value?$country.value:userCountry}`,
            createdAt: `${getTodayDate()}`,
            reason:`${$reason.value?$reason.value:userReason}`
        }
        try {
            loader(true);
            const responsePut:Boolean = await city.updateCity(userCity,dataToEdit);
            loader(false);
            if(responsePut){
            window.location.reload();
            showModal(`${capitalizeFirstLetter(userCity)} edited successfully`);
            }
        } catch (error) {
            loader(false);
            showModal(`${error}`);
        }
        }else{
        showModal("Please fill in at least one field to edit");
        throw new Error("Please fill in at least one field to edit");
        }
    });

    }
  }
  

