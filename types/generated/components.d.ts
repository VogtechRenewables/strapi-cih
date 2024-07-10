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

export interface ResourceGroupResourceGroup extends Schema.Component {
  collectionName: 'components_resource_group_resource_groups';
  info: {
    displayName: 'ResourceGroup';
    icon: 'cloud';
    description: '';
  };
  attributes: {
    resourceLink: Attribute.Text;
    resourceName: Attribute.Text;
  };
}

export interface SessionsSessions extends Schema.Component {
  collectionName: 'components_sessions_sessions';
  info: {
    displayName: 'Sessions';
    icon: 'pinMap';
  };
  attributes: {
    weekstart: Attribute.String;
    weekend: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'card-info.card-info': CardInfoCardInfo;
      'resource-group.resource-group': ResourceGroupResourceGroup;
      'sessions.sessions': SessionsSessions;
    }
  }
}
