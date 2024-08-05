import './delete-button.component.css'
export function createDeleteButton(deleteId: string): HTMLButtonElement {
    //HTML Elements
    const $button = document.createElement('button');
    $button.id = 'delete-button';
    $button.setAttribute('deleteId', deleteId);
    
    const $img = document.createElement('img');
    $img.id='delete-button-icon'

    $button.appendChild($img);
    
    return $button;
}