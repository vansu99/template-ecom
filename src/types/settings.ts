import { ResponseData } from './common';

export type Setting<T> = {
  id: number;
  key: string;
  value: T;
};

export type SettingUI = {
  site_name: string | null;
  logo: string | null;
  footer_logo: string | null;
  ogp_title: string | null;
  ogp_description: string | null;
  ogp_url: string | null;
  ogp_image: string | null;
  site_description: string | null;
};

export type ResponseSettings = ResponseData<Setting<SettingUI>[]>;
