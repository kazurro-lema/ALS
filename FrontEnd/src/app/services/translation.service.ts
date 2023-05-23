import { Injectable } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';

const TRANSLATIONS = {
  en: {
    COMPONENT: {
      EVENT: {
        ID: 'ID',
        NAME: 'Name',
        DESC: 'Description',
        DESC_PH: 'Add a new description',
        DATE_INI: 'Start Date',
        DATE_END: 'End Date',
        LOCATION: 'Location',
        AUTHOR: 'Author',
        BAN_DESC: 'Ban description',
        BAN_DESC_PH: 'Add a new ban bescription',
        OVERVIEW: 'Overview',
        USERNAME: 'Username',
        EMAIL: 'Email',
        ROLE: 'Role',
        TITLE: {
          NEW_EVENT: 'Add new event',
          DETAILS_EDIT: 'Edit event',
          EVENT_INSCRIPTION: 'View / Inscript to event',
          MYEVENTS: 'My events',
          BAN_EVENT: 'Ban event',
        },
        FORM: {
          OPEN: 'Open'
        }
      },
      USER: {
        USERNAME: 'User name',
        EMAIL: 'Email',
        PASSWORD: 'Password',
        REMEMBERME: 'Remember me',
        REGISTER: 'Register',
        LOGIN: 'Already have an account? Click here to login',
        OPTIONS: {
          REGISTER: 'Register',
          LOGIN: 'Login',
        }
      },
      COMMON: {
        SAVE: 'Save',
        NO_RESULTS: 'No results',
        INSCRIPT: 'Inscript',
        ABANDON: 'Abandon',
        BAN: 'Ban',
        BUTTON:{
          MENU: 'Menu',
          CLEAR: 'Clear',
          EDIT: 'Edit',
          DELETE: 'Delete',
          FILTER: 'Filter',
          LOGIN: 'Login',
          REGISTER: 'Register',
          LOGOUT: 'Logout',
        },
        OPTIONS:{
          ACTIONSMENU: 'Actions',
          DETAILS: 'Details',
          INSCRIPT: 'Inscript',
          DELETE: 'Delete',
          BAN: 'Ban'
        }
      },
      TOAST:{
        REGISTER_SUCCESSFULLY: 'Successfully registered',
        REGISTER_INCORRECT: 'Incorrect registration',
        LOGIN_INCORRECT: 'Login incorrect',
        LOGOUT_SUCCESSFULLY: 'You have been logged out',
        ADDED_SUCCESSFULLY: 'Event has been added',
        ADDED_INCORRECT: 'The event has not been added',
        INSCRIPTED_SUCCESSFULLY: 'Successfully subscribed',
        INSCRIPTED_INCORRECT: 'Incorrectly subscribed',
        ABANDONED_SUCCESSFULLY:'Successfully abandoned event',
        ABANDONED_INCORRECT:'Incorrectly abandoned event',
        UPDATED_SUCCESSFULLY: 'Event has been updated',
        UPDATED_INCORRECT: 'Event has not been updated',
        DELETED_SUCCESSFULLY: 'Event has been deleted',
        DELETED_INCORRECT: 'Event has not been deleted',
        USER_UPDATED: 'User has been updated',
        USER_NOT_UPDATED: 'User has not been updated',
        USER_DELETED: 'User has been deleted',
        USER_NOT_DELETED: 'User has not been deleted',
        BANNED_SUCCESSFULLY: 'Event has been baned',
        BANNED_UNSUCCESSFULLY: 'Event has not been baned',
      },
      SIDENAV:{
        EXPAND: 'Expand',
        COLLAPSE: 'Collapse',
        DASHBOARD: 'Dashboard',
        MYEVENTS: 'My events',
        ADD_EVENT: 'Add event',
        MOD_DASHBOARD: 'Moderation Panel',
        MOD_EVENT_DASHBOARD: 'Event Moderation',
        MOD_USER_DASHBOARD: 'User Moderation',
        PROFILE: 'Profile',
      },
      HEADER:{
        ES_LANG: 'Spanish',
        EN_LANG: 'English',
      }
    }
  },
  es: {
    COMPONENT: {
      EVENT: {
        ID: 'ID',
        NAME: 'Nombre',
        DESC: 'Descripción',
        DESC_PH: 'Añade una descripción',
        DATE_INI: 'Fecha de Inicio',
        DATE_END: 'Fecha de Fin',
        LOCATION: 'Ubicación',
        AUTHOR: 'Autor',
        BAN_DESC: 'Descripción del ban',
        BAN_DESC_PH: 'Añade una descripción del ban',
        OVERVIEW: 'Resumen',
        USERNAME: 'Usuario',
        EMAIL: 'Email',
        ROLE: 'Rol',
        TITLE: {
          NEW_EVENT: 'Crear nuevo evento',
          DETAILS_EDIT: 'Editar evento',
          EVENT_INSCRIPTION: 'Ver / Inscribirse al evento',
          MYEVENTS: 'Mis eventos',
          BAN_EVENT: 'Banear evento',
        },
        FORM: {
          OPEN: 'Abrir'
        }
      },
      USER: {
        USERNAME: 'Nombre de usuario',
        EMAIL: 'Correo electronico',
        PASSWORD: 'Contraseña',
        REMEMBERME: 'Recordar usuario ',
        REGISTER: 'Registrarse',
        LOGIN: '¿Ya tienes cuenta? Pincha aquí para acceder',
        OPTIONS: {
          REGISTER: 'Registrarse',
          LOGIN: 'Iniciar Sesión'
        }
      },
      COMMON: {
        SAVE: 'Guardar',
        NO_RESULTS: 'Sin resultados',
        INSCRIPT: 'Inscribirse',
        ABANDON: 'Abandonar',
        BAN: 'Banear',
        BUTTON:{
          MENU: 'Menu',
          CLEAR: 'Limpiar',
          EDIT: 'Editar',
          DELETE: 'Eliminar',
          FILTER: 'Filtrar',
          LOGIN: 'Acceder',
          REGISTER: 'Registrarse',
          LOGOUT: 'Cerrar sesión'
        },
        OPTIONS:{
          ACTIONSMENU: 'Acciones',
          DETAILS: 'Detalles',
          INSCRIPT: 'Inscribirse',
          DELETE: 'Eliminar',
          BAN: 'Banear'
        }
      },
      TOAST:{
        REGISTER_SUCCESSFULLY: 'Se ha registrado correctamente',
        REGISTER_INCORRECT: 'Registro incorrecto',
        LOGIN_INCORRECT: 'Login incorrecto',
        LOGOUT_SUCCESSFULLY: 'Se ha cerrado sesión',
        ADDED_SUCCESSFULLY: 'Se ha añadido el evento',
        ADDED_INCORRECT: 'No se ha añadido el evento',
        INSCRIPTED_SUCCESSFULLY: 'Inscrito correctamente',
        INSCRIPTED_INCORRECT: 'Inscrito incorrectamente',
        ABANDONED_SUCCESSFULLY:'Evento abandonado correctamente',
        ABANDONED_INCORRECT:'Evento abandonado incorrectamente',
        UPDATED_SUCCESSFULLY: 'Se ha actualizado el evento',
        UPDATED_INCORRECT: 'No se ha actualizado el evento',
        DELETED_SUCCESSFULLY: 'Se ha eliminado el evento',
        DELETED_INCORRECT: 'No se ha eliminado el evento',
        USER_UPDATED: 'Se ha actualizado el usuario',
        USER_NOT_UPDATED: 'No se ha actualizado el usuario',
        USER_DELETED: 'Se ha eliminado el usuario',
        USER_NOT_DELETED: 'No se ha eliminado el usuario',
        BANNED_SUCCESSFULLY: 'Se ha baneado el evento',
        BANNED_UNSUCCESSFULLY: 'No se ha baneado el evento',
      },
      SIDENAV:{
        EXPAND: 'Expandir',
        COLLAPSE: 'Contraer',
        DASHBOARD: 'Dashboard',
        MYEVENTS: 'Mis eventos',
        ADD_EVENT: 'Añadir Evento',
        MOD_DASHBOARD: 'Panel de Moderación',
        MOD_EVENT_DASHBOARD: 'Moderación de Eventos',
        MOD_USER_DASHBOARD: 'Moderación de Usuarios',
        PROFILE: 'Perfil',
      },
      HEADER:{
        ES_LANG: 'Español',
        EN_LANG: 'Ingles'
      }
    }
  }
};

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  currentLang: string;
  language = new Subject<string>();

  constructor(private translate: TranslateService, private dateAdapter: DateAdapter<Date>) {
    this.translate.setTranslation('en', TRANSLATIONS.en);
    this.translate.setTranslation('es', TRANSLATIONS.es);
  }

  getTranslations() {
    if (localStorage.getItem('lang')) {
      this.currentLang = localStorage.getItem('lang') || '';
    } else {
      this.currentLang = 'es';
      localStorage.setItem('lang', this.currentLang);
    }
    this.translate.use(this.currentLang);
    this.language.next(this.currentLang);
  }

  setLang(language: string) {
    localStorage.setItem('lang', language);
    this.currentLang = language;
    this.language.next(this.currentLang);
    this.translate.use(language);
    this.dateAdapter.setLocale(language);
  }

  getLang(): string {
    return this.currentLang;
  }
}
