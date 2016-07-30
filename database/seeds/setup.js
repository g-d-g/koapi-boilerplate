
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('posts').del(),
    knex('comments').del(),
    knex('oauth_clients').del(),
    knex('users').del(),
    knex('roles').del(),

    // Inserts seed entries
    knex('oauth_clients').insert({client_id:'123', client_secret: '123', user_id:1, redirect_uri:'http://ubuntu:5000', grant_types:'password', scope:'all'}),
    knex('users').insert({username:'test', password:'202cb962ac59075b964b07152d234b70', email:"test@gmail.com"}),
    knex('roles').insert({name:'admin', permissions:{all:true}}),
    knex('user2role').insert({user_id:1,role_id:1}),
    knex('posts').insert({id: 1, title: 'Post Title', contents:'Post Contents', user_id:1}),
    knex('comments').insert({id: 1, title: 'Comment Title', contents:'Comment Contents', user_id:1, post_id:1})
  );
};
