export let emailPattern =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export let phonePattern = /^[0-9]{10}$/;

export let aadharPattern = /^[0-9]{12}$/;

export let panCardPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

export let bankAccountPattern = /^[0-9]{9,18}$/;

export let ifscPattern = /^[A-Z]{4}[0-9]{7}$/;

export let upiAddress = /^([a-zA-Z0-9]{2,})@([a-zA-Z0-9]{2,})$/;

export let passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,}).*$/;
