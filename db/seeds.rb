# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


User.destroy_all
Notebook.destroy_all
Note.destroy_all

u1 = User.create!({email: 'demouser@gmail.com', password: 'demouser'});
n1  = Notebook.create!({title: 'notebook1', user_id: u1.id})
Note.create!({title: 'note1', content: "content1", notebook_id: n1.id})
Note.create!({title: 'note2', content: "content2", notebook_id: n1.id})
Note.create!({title: 'note3', content: "content3", notebook_id: n1.id})
Note.create!({title: 'note4', content: "content4", notebook_id: n1.id})
Note.create!({title: 'note5', content: "content5", notebook_id: n1.id})
Note.create!({title: 'note6', content: "content6", notebook_id: n1.id})
Note.create!({title: 'note7', content: "content7", notebook_id: n1.id})
Note.create!({title: 'note8', content: "content8", notebook_id: n1.id})
Note.create!({title: 'note9', content: "content9", notebook_id: n1.id})
Note.create!({title: 'note10', content: "content10", notebook_id: n1.id})
Note.create!({title: 'note11', content: "content11", notebook_id: n1.id})
Note.create!({title: 'note12', content: "content12", notebook_id: n1.id})
Note.create!({title: 'note13', content: "content13", notebook_id: n1.id})