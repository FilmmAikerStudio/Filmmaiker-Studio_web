import { FooterLink } from "../types";

export const FOOTER_LINKS: FooterLink[] = [
  {
    name: 'LinkedIn',
    hoverText: 'Conecta con nosotros',
    icon: 'icons/linkedin.svg',
    url: 'https://www.linkedin.com/in/filmmaiking/',
  },
  {
    name: 'Portfolio',
    hoverText: 'Nuestros proyectos',
    icon: 'icons/globe.svg',
    url: 'https://www.filmmaikerstudio.com',
  },
  {
    name: 'Contacto',
    hoverText: 'Hablemos',
    icon: 'icons/email.svg',
    url: '#', // Changed from mailto because we will intercept it for the contact form
  }
];