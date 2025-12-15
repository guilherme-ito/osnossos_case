import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'darkMode';
  private darkMode = false;

  constructor(private platform: Platform) {}

  async isDarkMode(): Promise<boolean> {
    try {
      // Tenta usar Capacitor Preferences se disponível
      if (this.platform.is('capacitor')) {
        const { Preferences } = await import('@capacitor/preferences');
        const { value } = await Preferences.get({ key: this.THEME_KEY });
        if (value !== null) {
          return value === 'true';
        }
      } else {
        // Fallback para localStorage no navegador
        const stored = localStorage.getItem(this.THEME_KEY);
        if (stored !== null) {
          return stored === 'true';
        }
      }
      // Se não houver preferência salva, verifica a preferência do sistema
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch (error) {
      // Fallback para localStorage em caso de erro
      const stored = localStorage.getItem(this.THEME_KEY);
      if (stored !== null) {
        return stored === 'true';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
  }

  async toggle(): Promise<void> {
    const current = await this.isDarkMode();
    const newTheme = !current;
    await this.setDarkMode(newTheme);
  }

  async setDarkMode(isDark: boolean): Promise<void> {
    this.darkMode = isDark;
    
    try {
      // Salva a preferência
      if (this.platform.is('capacitor')) {
        const { Preferences } = await import('@capacitor/preferences');
        await Preferences.set({ key: this.THEME_KEY, value: isDark.toString() });
      } else {
        localStorage.setItem(this.THEME_KEY, isDark.toString());
      }
    } catch (error) {
      console.error('Error saving theme preference:', error);
      localStorage.setItem(this.THEME_KEY, isDark.toString());
    }
    
    // Aplica o tema usando o método do Ionic
    this.applyTheme(isDark);
  }

  private applyTheme(isDark: boolean): void {
    // Aplica imediatamente, sem esperar Platform.ready()
    const apply = () => {
      const html = document.documentElement;
      const body = document.body;
      const ionApp = document.querySelector('ion-app');
      
      // Remove todas as classes de tema primeiro
      html.classList.remove('dark', 'light');
      body.classList.remove('dark', 'light');
      if (ionApp) {
        ionApp.classList.remove('dark', 'light');
      }
      
      // Adiciona a classe apropriada
      if (isDark) {
        html.classList.add('dark');
        body.classList.add('dark');
        if (ionApp) {
          ionApp.classList.add('dark');
        }
      } else {
        html.classList.add('light');
        body.classList.add('light');
        if (ionApp) {
          ionApp.classList.add('light');
        }
      }
      
      console.log('Theme applied:', isDark ? 'dark' : 'light');
      console.log('HTML classes:', html.className);
      console.log('Body classes:', body.className);
      if (ionApp) {
        console.log('IonApp classes:', ionApp.className);
      }
    };
    
    // Tenta aplicar imediatamente
    apply();
    
    // Se a plataforma estiver disponível, também aplica após ready
    if (this.platform.is('hybrid')) {
      this.platform.ready().then(() => {
        apply();
      });
    }
  }

  async init(): Promise<void> {
    const isDark = await this.isDarkMode();
    this.darkMode = isDark;
    this.applyTheme(isDark);
    console.log('Theme initialized. Dark mode:', isDark);
  }
}
