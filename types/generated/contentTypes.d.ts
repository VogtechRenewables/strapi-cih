import type { Schema, Attribute } from '@strapi/strapi';

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    username: Attribute.String;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    registrationToken: Attribute.String & Attribute.Private;
    isActive: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private;
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    preferedLanguage: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions';
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    alternativeText: Attribute.String;
    caption: Attribute.String;
    width: Attribute.Integer;
    height: Attribute.Integer;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    ext: Attribute.String;
    mime: Attribute.String & Attribute.Required;
    size: Attribute.Decimal & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesRelease extends Schema.CollectionType {
  collectionName: 'strapi_releases';
  info: {
    singularName: 'release';
    pluralName: 'releases';
    displayName: 'Release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    releasedAt: Attribute.DateTime;
    scheduledAt: Attribute.DateTime;
    timezone: Attribute.String;
    status: Attribute.Enumeration<
      ['ready', 'blocked', 'failed', 'done', 'empty']
    > &
      Attribute.Required;
    actions: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Schema.CollectionType {
  collectionName: 'strapi_release_actions';
  info: {
    singularName: 'release-action';
    pluralName: 'release-actions';
    displayName: 'Release Action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    type: Attribute.Enumeration<['publish', 'unpublish']> & Attribute.Required;
    entry: Attribute.Relation<
      'plugin::content-releases.release-action',
      'morphToOne'
    >;
    contentType: Attribute.String & Attribute.Required;
    locale: Attribute.String;
    release: Attribute.Relation<
      'plugin::content-releases.release-action',
      'manyToOne',
      'plugin::content-releases.release'
    >;
    isEntryValid: Attribute.Boolean;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Schema.CollectionType {
  collectionName: 'up_permissions';
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles';
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    description: Attribute.String;
    type: Attribute.String & Attribute.Unique;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Attribute.String;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale';
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetMinMax<
        {
          min: 1;
          max: 50;
        },
        number
      >;
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAboutAbout extends Schema.SingleType {
  collectionName: 'abouts';
  info: {
    singularName: 'about';
    pluralName: 'abouts';
    displayName: 'about';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    aboutUsTitle: Attribute.String;
    aboutUsContent: Attribute.Text;
    missionTitle: Attribute.String;
    missionContent: Attribute.Text;
    diversityTitle: Attribute.String;
    diversityContent: Attribute.Text;
    visionTitle: Attribute.String;
    visionContent: Attribute.Text;
    valuesTitle: Attribute.String;
    valuesContent: Attribute.Text;
    additionalTitle: Attribute.String;
    additionalContent: Attribute.Text;
    button: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::about.about',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::about.about',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAboutFrenchAboutFrench extends Schema.SingleType {
  collectionName: 'about_frenches';
  info: {
    singularName: 'about-french';
    pluralName: 'about-frenches';
    displayName: 'about-french';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    aboutUsTitle: Attribute.String;
    aboutUsContent: Attribute.Text;
    missionTitle: Attribute.String;
    missionContent: Attribute.Text;
    diversityTitle: Attribute.String;
    diversityContent: Attribute.Text;
    visionTitle: Attribute.String;
    visionContent: Attribute.Text;
    valuesTitle: Attribute.String;
    valuesContent: Attribute.Text;
    additionalTitle: Attribute.String;
    additionalContent: Attribute.Text;
    back: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::about-french.about-french',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::about-french.about-french',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiChildregistrationChildregistration
  extends Schema.SingleType {
  collectionName: 'childregistrations';
  info: {
    singularName: 'childregistration';
    pluralName: 'childregistrations';
    displayName: 'childregistration';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    formTitle: Attribute.String;
    formDescription: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::childregistration.childregistration',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::childregistration.childregistration',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiChildregistrationFrenchChildregistrationFrench
  extends Schema.SingleType {
  collectionName: 'childregistration_frenches';
  info: {
    singularName: 'childregistration-french';
    pluralName: 'childregistration-frenches';
    displayName: 'childregistration-french';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    formTitle: Attribute.String;
    formDescription: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::childregistration-french.childregistration-french',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::childregistration-french.childregistration-french',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiContactContact extends Schema.SingleType {
  collectionName: 'contacts';
  info: {
    singularName: 'contact';
    pluralName: 'contacts';
    displayName: 'contact';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    formTitle: Attribute.String;
    namePlaceholder: Attribute.String;
    emailPlaceholder: Attribute.String;
    phonePlaceholder: Attribute.String;
    messagePlaceholder: Attribute.String;
    submitButton: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::contact.contact',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::contact.contact',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiContactFrenchContactFrench extends Schema.SingleType {
  collectionName: 'contact_frenches';
  info: {
    singularName: 'contact-french';
    pluralName: 'contact-frenches';
    displayName: 'contact-french';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    formTitle: Attribute.String;
    namePlaceholder: Attribute.String;
    emailPlaceholder: Attribute.String;
    phonePlaceholder: Attribute.String;
    messagePlaceholder: Attribute.String;
    submitButton: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::contact-french.contact-french',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::contact-french.contact-french',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiFooterFooter extends Schema.SingleType {
  collectionName: 'footers';
  info: {
    singularName: 'footer';
    pluralName: 'footers';
    displayName: 'footer';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    footerTitle: Attribute.String;
    footerDescription: Attribute.Text;
    navigation1: Attribute.String;
    navigation2: Attribute.String;
    navigation3: Attribute.String;
    navigation4: Attribute.String;
    navigation5: Attribute.String;
    aboutUs1: Attribute.String;
    aboutUs2: Attribute.String;
    aboutUs3: Attribute.String;
    aboutUs4: Attribute.String;
    aboutUs5: Attribute.String;
    programs1: Attribute.String;
    programs2: Attribute.String;
    programs3: Attribute.String;
    programs4: Attribute.String;
    resources1: Attribute.String;
    resources2: Attribute.String;
    resources3: Attribute.String;
    resources4: Attribute.String;
    resources5: Attribute.String;
    contact1: Attribute.String;
    email: Attribute.Text;
    phone: Attribute.Text;
    navigation: Attribute.String;
    aboutUs: Attribute.String;
    programs: Attribute.String;
    resources: Attribute.String;
    contact: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::footer.footer',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::footer.footer',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiFooterFrenchFooterFrench extends Schema.SingleType {
  collectionName: 'footer_frenches';
  info: {
    singularName: 'footer-french';
    pluralName: 'footer-frenches';
    displayName: 'footer-french';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    footerTitle: Attribute.String;
    footerDescription: Attribute.Text;
    navigation1: Attribute.String;
    navigation2: Attribute.String;
    navigation3: Attribute.String;
    navigation4: Attribute.String;
    navigation5: Attribute.String;
    aboutUs1: Attribute.String;
    aboutUs2: Attribute.String;
    aboutUs3: Attribute.String;
    aboutUs4: Attribute.String;
    aboutUs5: Attribute.String;
    programs1: Attribute.String;
    programs2: Attribute.String;
    programs3: Attribute.String;
    programs4: Attribute.String;
    resources1: Attribute.String;
    resources2: Attribute.String;
    resources3: Attribute.String;
    resources4: Attribute.String;
    resources5: Attribute.String;
    contact1: Attribute.String;
    email: Attribute.Text;
    phone: Attribute.Text;
    navigation: Attribute.String;
    aboutUs: Attribute.String;
    programs: Attribute.String;
    resources: Attribute.String;
    contact: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::footer-french.footer-french',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::footer-french.footer-french',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiHeaderHeader extends Schema.SingleType {
  collectionName: 'headers';
  info: {
    singularName: 'header';
    pluralName: 'headers';
    displayName: 'header';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    headerLink1: Attribute.Text;
    headerLink2: Attribute.String;
    headerLink3: Attribute.String;
    headerLink4: Attribute.String;
    headerLink5: Attribute.String;
    headerLink6: Attribute.String;
    signIn: Attribute.String;
    logOut: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::header.header',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::header.header',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiHeaderFrenchHeaderFrench extends Schema.SingleType {
  collectionName: 'header_frenches';
  info: {
    singularName: 'header-french';
    pluralName: 'header-frenches';
    displayName: 'header-french';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    headerLink1: Attribute.Text;
    headerLink2: Attribute.String;
    headerLink3: Attribute.String;
    headerLink4: Attribute.String;
    headerLink5: Attribute.String;
    headerLink6: Attribute.String;
    signIn: Attribute.String;
    logOut: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::header-french.header-french',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::header-french.header-french',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiHomeHome extends Schema.SingleType {
  collectionName: 'homes';
  info: {
    singularName: 'home';
    pluralName: 'homes';
    displayName: 'home';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    heroSmall: Attribute.String;
    heroBig: Attribute.Text;
    learnMoreButton: Attribute.String;
    resourcesSectionTitle: Attribute.String;
    resourcesSectionDesc: Attribute.Text;
    resourceBlockTitle1: Attribute.String;
    resourceBlockDesc1: Attribute.Text;
    resourceBlockTitle2: Attribute.String;
    resourceBlockDesc2: Attribute.Text;
    resourceBlockTitle3: Attribute.String;
    resourceBlockDesc3: Attribute.Text;
    resourceBlockTitle4: Attribute.String;
    resourceBlockDesc4: Attribute.Text;
    contact: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::home.home', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::home.home', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiHomeFrenchHomeFrench extends Schema.SingleType {
  collectionName: 'home_frenches';
  info: {
    singularName: 'home-french';
    pluralName: 'home-frenches';
    displayName: 'home-french';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    heroSmall: Attribute.String;
    heroBig: Attribute.Text;
    learnMoreButton: Attribute.String;
    resourceBlockTitle1: Attribute.String;
    resourceBlockDesc1: Attribute.Text;
    resourceBlockTitle2: Attribute.String;
    resourceBlockDesc2: Attribute.Text;
    resourceBlockTitle3: Attribute.String;
    resourceBlockDesc3: Attribute.Text;
    resourceBlockTitle4: Attribute.String;
    resourceBlockDesc4: Attribute.Text;
    contact: Attribute.String;
    resourcesSectionTitle: Attribute.String;
    resourcesSectionDesc: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::home-french.home-french',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::home-french.home-french',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPageNotFoundPageNotFound extends Schema.SingleType {
  collectionName: 'page_not_founds';
  info: {
    singularName: 'page-not-found';
    pluralName: 'page-not-founds';
    displayName: 'page not found';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    error: Attribute.Text;
    textOne: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::page-not-found.page-not-found',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::page-not-found.page-not-found',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPageNotFoundFrenchPageNotFoundFrench
  extends Schema.SingleType {
  collectionName: 'page_not_found_frenches';
  info: {
    singularName: 'page-not-found-french';
    pluralName: 'page-not-found-frenches';
    displayName: 'page not found-french';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    error: Attribute.Text;
    textOne: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::page-not-found-french.page-not-found-french',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::page-not-found-french.page-not-found-french',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiProgramAndServiceProgramAndService
  extends Schema.SingleType {
  collectionName: 'program_and_services';
  info: {
    singularName: 'program-and-service';
    pluralName: 'program-and-services';
    displayName: 'program and service';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    pageTitle: Attribute.String;
    CardInfo: Attribute.Component<'card-info.card-info', true>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::program-and-service.program-and-service',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::program-and-service.program-and-service',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiProgramAndServiceFrenchProgramAndServiceFrench
  extends Schema.SingleType {
  collectionName: 'program_and_service_frenches';
  info: {
    singularName: 'program-and-service-french';
    pluralName: 'program-and-service-frenches';
    displayName: 'program and service-french';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    pageTitle: Attribute.String;
    CardInfo: Attribute.Component<'card-info.card-info', true>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::program-and-service-french.program-and-service-french',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::program-and-service-french.program-and-service-french',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiResourceResource extends Schema.SingleType {
  collectionName: 'resources';
  info: {
    singularName: 'resource';
    pluralName: 'resources';
    displayName: 'resource';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    formTitle: Attribute.String;
    ResourceInfo: Attribute.Component<'resource-group.resource-group', true>;
    group1: Attribute.String;
    group2: Attribute.String;
    group3: Attribute.String;
    group4: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::resource.resource',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::resource.resource',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiResourceFrenchResourceFrench extends Schema.SingleType {
  collectionName: 'resource_frenches';
  info: {
    singularName: 'resource-french';
    pluralName: 'resource-frenches';
    displayName: 'resource-french';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    formTitle: Attribute.String;
    ResourceInfo: Attribute.Component<'resource-group.resource-group', true>;
    group1: Attribute.String;
    group2: Attribute.String;
    group3: Attribute.String;
    group4: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::resource-french.resource-french',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::resource-french.resource-french',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSignInSignIn extends Schema.SingleType {
  collectionName: 'sign_ins';
  info: {
    singularName: 'sign-in';
    pluralName: 'sign-ins';
    displayName: 'sign-in';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    formTitle: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::sign-in.sign-in',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::sign-in.sign-in',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSuccessSuccess extends Schema.SingleType {
  collectionName: 'successes';
  info: {
    singularName: 'success';
    pluralName: 'successes';
    displayName: 'success';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    successMessageHeader: Attribute.Text;
    successMessageText: Attribute.Text;
    successMessageText2: Attribute.Text;
    greenBoxTitle: Attribute.String;
    greenBoxContent: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::success.success',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::success.success',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSuccessFrenchSuccessFrench extends Schema.SingleType {
  collectionName: 'success_frenches';
  info: {
    singularName: 'success-french';
    pluralName: 'success-frenches';
    displayName: 'success-french';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    successMessageHeader: Attribute.Text;
    successMessageText: Attribute.Text;
    successMessageText2: Attribute.Text;
    greenBoxTitle: Attribute.String;
    greenBoxContent: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::success-french.success-french',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::success-french.success-french',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSummercampSummercamp extends Schema.SingleType {
  collectionName: 'summercamps';
  info: {
    singularName: 'summercamp';
    pluralName: 'summercamps';
    displayName: 'summercamp';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    headerTitle: Attribute.String;
    headerAge: Attribute.String;
    headerTitle2: Attribute.String;
    headerSubTitle: Attribute.String;
    registrationHeader: Attribute.String;
    registrationHeaderDate: Attribute.String;
    registerButton1: Attribute.String;
    dateAndTimesTitle: Attribute.String;
    Sessions: Attribute.Component<'sessions.sessions', true>;
    paragraphTitle1: Attribute.Text;
    paragraphText1: Attribute.Text;
    paragraphTitle2: Attribute.Text;
    paragraphText2: Attribute.Text;
    paragraphTitle3: Attribute.Text;
    paragraphText3: Attribute.Text;
    paragraphTitle4: Attribute.Text;
    paragraphText4: Attribute.Text;
    buttonTitle: Attribute.String;
    registerButton2: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::summercamp.summercamp',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::summercamp.summercamp',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSummercampFrenchSummercampFrench extends Schema.SingleType {
  collectionName: 'summercamp_frenches';
  info: {
    singularName: 'summercamp-french';
    pluralName: 'summercamp-frenches';
    displayName: 'summercamp-french';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    headerTitle: Attribute.String;
    headerAge: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::summercamp-french.summercamp-french',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::summercamp-french.summercamp-french',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'plugin::i18n.locale': PluginI18NLocale;
      'api::about.about': ApiAboutAbout;
      'api::about-french.about-french': ApiAboutFrenchAboutFrench;
      'api::childregistration.childregistration': ApiChildregistrationChildregistration;
      'api::childregistration-french.childregistration-french': ApiChildregistrationFrenchChildregistrationFrench;
      'api::contact.contact': ApiContactContact;
      'api::contact-french.contact-french': ApiContactFrenchContactFrench;
      'api::footer.footer': ApiFooterFooter;
      'api::footer-french.footer-french': ApiFooterFrenchFooterFrench;
      'api::header.header': ApiHeaderHeader;
      'api::header-french.header-french': ApiHeaderFrenchHeaderFrench;
      'api::home.home': ApiHomeHome;
      'api::home-french.home-french': ApiHomeFrenchHomeFrench;
      'api::page-not-found.page-not-found': ApiPageNotFoundPageNotFound;
      'api::page-not-found-french.page-not-found-french': ApiPageNotFoundFrenchPageNotFoundFrench;
      'api::program-and-service.program-and-service': ApiProgramAndServiceProgramAndService;
      'api::program-and-service-french.program-and-service-french': ApiProgramAndServiceFrenchProgramAndServiceFrench;
      'api::resource.resource': ApiResourceResource;
      'api::resource-french.resource-french': ApiResourceFrenchResourceFrench;
      'api::sign-in.sign-in': ApiSignInSignIn;
      'api::success.success': ApiSuccessSuccess;
      'api::success-french.success-french': ApiSuccessFrenchSuccessFrench;
      'api::summercamp.summercamp': ApiSummercampSummercamp;
      'api::summercamp-french.summercamp-french': ApiSummercampFrenchSummercampFrench;
    }
  }
}
