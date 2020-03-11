require_relative 'boot'

require 'rails/all'

Bundler.require(*Rails.groups)

module ChatSpace
  class Application < Rails::Application
    # タイムゾーンを日本時間に設定する記述
    config.time_zone = 'Tokyo'
    
    config.generators do |g|
      g.stylesheets false
      g.javascripts false
      g.helper false
      g.test_framework false

      config.i18n.default_locale = :ja
    end
  end
end
