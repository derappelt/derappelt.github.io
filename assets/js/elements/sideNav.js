'use strict';
////////////////////////////////////////////////////////////////////////////////
//  SideNavToggle
////////////////////////////////////////////////////////////////////////////////
class SideNavToggle extends HTMLElement{
  get active(){
    return (this.getAttribute('active')=="true") ? true : false;
  }
  createdCallback() {
    var shadow = this.createShadowRoot();
    shadow.innerHTML += `<style>
      :host {
        position:absolute;
        right: -65px;
        top: 25px;
        width: 40px;
        height: 40px;
        background-color: blue;
        pointer-events: auto;
      }
      :host([active=true]){
        background-color:red;
      }
    </style>`;
  }
  _click(){
    document.querySelector('side-nav').setAttribute('active', !this.active);
  }

  attachedCallback() {
    this.addEventListener('click', this._click);
  }

  detachedCallback() {
    this.removeEventListener('click', this._click);
  }
}

document.registerElement('side-nav-toggle', SideNavToggle);

////////////////////////////////////////////////////////////////////////////////
//  SideNavMenu
////////////////////////////////////////////////////////////////////////////////
class SideNavMenu extends HTMLElement{

  get active() {
    return this.getAttribute('active') || false;
  }

  createdCallback() {
    console.log('side-nav-menu created!');
    var shadow = this.createShadowRoot();
    shadow.innerHTML += `<style>
      :host{
        position: absolute;
        height: 100vh;
        width: 80vw;
        max-width: 300px;
        background-color: #fff;
        top: 0;
        left: 0;
        will-change: transform;
        transition: transform 0.3s linear;
        transform: translateX(-102%);
        box-shadow: 0px 0 5px rgba(0,0,0,0.5);
      }
      :host([active=true]){
        transform: none;
      }
    </style>
    <side-nav-toggle></side-nav-toggle>
    <content></content>`;
  }

  attachedCallback() {
    this.attributeChangedCallback();
  }

  detachedCallback() {
  }

  attributeChangedCallback(active){
    this.querySelector('::shadow side-nav-toggle').setAttribute("active", this.active);
  }
}

document.registerElement('side-nav-menu', SideNavMenu);

////////////////////////////////////////////////////////////////////////////////
//  SideNavItem
////////////////////////////////////////////////////////////////////////////////
class SideNavItem extends HTMLElement{
  createdCallback() {
    console.log('side-nav-item created!');
    var shadow = this.createShadowRoot();
    shadow.innerHTML += `<style>
      :host{
        display:block;
        height: 40px;
        line-height: 40px;
        font-size: 24px;
        font-weight: bold;
        padding: 0 20px;

      }
    </style>
    <content></content>
    `;
  }

  attachedCallback() {
  }

  detachedCallback() {
  }
}

document.registerElement('side-nav-item', SideNavItem);

////////////////////////////////////////////////////////////////////////////////
//  SideNav
////////////////////////////////////////////////////////////////////////////////
class SideNav extends HTMLElement{
  createdCallback() {
    var shadow = this.createShadowRoot();
    shadow.innerHTML += `<style>
      :host{
        position: absolute;
        top:0;
        left:0;
        overflow: hidden;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0,0,0,0);
        pointer-events: none;
      }
      :host:before{
        pointer-events: none;
        content:" ";
        background-color:#000;
        position: absolute;
        width: 100%;
        height: 100%;
        transition: opacity 0.3s linear;
        opacity: 0;
        top: 0;
        left:0;
      }
      :host([active=true]){
        pointer-events: auto;
      }
      :host([active=true]):before{
        opacity:0.5;
      }
    </style>
    <side-nav-menu>
      <content></content>
    </side-nav-menu>
    `;
  }

  get active () {
    return this.getAttribute('active') || false;
  }

  attachedCallback() {
    this.attributeChangedCallback();
  }

  detachedCallback() {
  }

  attributeChangedCallback(active){
    this.querySelector('::shadow side-nav-menu').setAttribute("active", this.active);
  }
}

document.registerElement('side-nav', SideNav);
