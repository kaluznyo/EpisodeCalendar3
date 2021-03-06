Episodecalendar2::Application.configure do
  # Settings specified here will take precedence over those in config/application.rb

  # In the development environment your application's code is reloaded on
  # every request.  This slows down response time but is perfect for development
  # since you don't have to restart the web server when you make code changes.
  config.cache_classes = false

  # Log error messages when you accidentally call methods on nil.
  config.whiny_nils = true

  # Show full error reports and disable caching
  config.consider_all_requests_local       = true
  config.action_controller.perform_caching = false

  #Cache testing
  config.action_controller.perform_caching = true
  config.cache_store = :dalli_store, { :namespace => "episodecalendar", :expires_in => 7.day, :compress => true, :keepalive => true }

  # Don't care if the mailer can't send
  config.action_mailer.raise_delivery_errors = false

  # Print deprecation notices to the Rails logger
  config.active_support.deprecation = :log

  # Only use best-standards-support built into browsers
  config.action_dispatch.best_standards_support = :builtin

  # Do not compress assets
  config.assets.compress = false

  # Expands the lines which load the assets
  config.assets.debug = false

  # Don't actually send emails. View them in the browser instead using this gem
  #config.action_mailer.delivery_method = :letter_opener

  #Rack bug
  #config.middleware.use "Rack::Bug", :secret_key => "someverylongandveryhardtoguesspreferablyrandomstring", :ip_masks => [IPAddr.new("192.168.1.100")]
  #config.middleware.use "Rack::Insight::App", :secret_key => "someverylongandveryhardtoguesspreferablyrandomstring"

  #Bullet
  #config.after_initialize do
    #Bullet.enable = true
    #Bullet.alert = true
    #Bullet.bullet_logger = true
    #Bullet.console = true
    #Bullet.growl = true
    #Bullet.rails_logger = true
    #Bullet.airbrake = true
    #Bullet.disable_browser_cache = true
  #end

  config.action_mailer.default_url_options = { :host => "localhost" }
end
