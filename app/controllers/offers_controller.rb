# frozen_string_literal: true

class OffersController < ApplicationController
  layout "offers"

  def index
    @hello_world_props = { name: "Stranger" }
  end
end
