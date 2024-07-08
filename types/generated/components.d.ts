import type { Schema, Attribute } from '@strapi/strapi';

export interface CardInfoCardInfo extends Schema.Component {
  collectionName: 'components_card_info_card_infos';
  info: {
    displayName: 'CardInfo';
    icon: 'bulletList';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'card-info.card-info': CardInfoCardInfo;
    }
  }
}
