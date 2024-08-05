import './edit-button.component.css'
export function createEditButton(idPost:string, title:string,body:string,postUrl:string,creator:string,platform:string): HTMLButtonElement {
    //HTML Elements
    const $button = document.createElement('button');
    $button.id = 'edit-button';
    $button.setAttribute('idPost', idPost);
    $button.setAttribute('title', title);
    $button.setAttribute('body', body);
    $button.setAttribute('postUrl', postUrl);
    $button.setAttribute('platform', platform);
    
    
    const $img = document.createElement('img');
    $img.id='edit-button-icon'

    $button.appendChild($img);
    
    return $button;
}