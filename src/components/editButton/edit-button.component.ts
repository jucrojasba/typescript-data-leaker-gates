import './edit-button.component.css'
export function createEditButton(editId: string,userCountry:string,userReason:string): HTMLButtonElement {
    //HTML Elements
    const $button = document.createElement('button');
    $button.id = 'edit-button';
    $button.setAttribute('editId', editId);
    $button.setAttribute('userCountry', userCountry);
    $button.setAttribute('userReason', userReason);
    
    const $img = document.createElement('img');
    $img.id='edit-button-icon'

    $button.appendChild($img);
    
    return $button;
}