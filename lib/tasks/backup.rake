namespace :db do
  desc 'backup'
  task backup: :environment do
    puts 'backing up data....'
    exec "rake db:seed:dump FILE=db/data/backup#{Time.now.strftime("%s")}.rb"
  end
end

