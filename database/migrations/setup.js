exports.up = function(knex, Promise) {
  return knex.schema
            //  .createTable('oauth_clients', function (table) {
            //    table.string('client_id').primary();
            //    table.string('client_secret');
            //    table.string('redirect_uri');
            //    table.string('grant_types');
            //    table.string('scope');
            //    table.string('user_id');
            //  })
            //  .createTable('oauth_authorization_codes', function (table) {
            //    table.string('code').primary();
            //    table.string('client_id');
            //    table.string('user_id');
            //    table.string('redirect_uri');
            //    table.string('scope');
            //    table.timestamp('expires');
            //  })
            //  .createTable('oauth_access_tokens', function (table) {
            //    table.string('access_token').primary();
            //    table.string('client_id');
            //    table.string('user_id');
            //    table.string('scope');
            //    table.timestamp('expires');
            //  })
            //  .createTable('oauth_refresh_tokens', function (table) {
            //    table.string('refresh_token').primary();
            //    table.string('client_id');
            //    table.string('user_id');
            //    table.string('scope');
            //    table.timestamp('expires');
            //  })
             .createTable('users', function (table) {
               table.increments('id').primary();
               table.string('name').unique();
               table.string('password');
               table.string('email').unique();
               table.timestamp('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
               table.timestamp('updated_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
             })
             .createTable('user2role', function (table) {
               table.integer('user_id');
               table.integer('role_id');
             })
             .createTable('roles', function (table) {
               table.increments('id').primary();
               table.string('name').unique();
               table.jsonb('permissions');
             })
             .createTable('user_openids', function (table) {
               table.increments('id').primary();
               table.integer('user_id');
               table.string('provider');
               table.string('openid');
               table.string('access_token');
               table.string('refresh_token');
               table.jsonb('profile');
               table.timestamp('expires_at');
               table.timestamp('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
               table.timestamp('updated_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
             })
             .createTable('posts', function(table) {
               table.increments('id').primary();
               table.string('title');
               table.text('contents');
               table.integer('user_id');
               table.timestamp('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
               table.timestamp('updated_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
             })
             .createTable('comments', function(table) {
               table.increments('id').primary();
               table.string('title');
               table.text('contents');
               table.integer('user_id');
               table.integer('post_id');
               table.timestamp('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
               table.timestamp('updated_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
             });
};

exports.down = function(knex, Promise) {
  return knex.schema
             .dropTable('users')
             .dropTable('roles')
             .dropTable('user2role')
             .dropTable('user_openids')
             .dropTable('posts')
             .dropTable('comments');
};
