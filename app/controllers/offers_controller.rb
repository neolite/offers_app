# frozen_string_literal: true

class OffersController < ApplicationController
  layout "offers"

  def index
    @component_props = { offers: Offer.order(created_at: :desc).all }
  end

  def create
    @offer = Offer.new(offers_params)
    @offer.save
  end

  def update
    @offer.update(offers_params)
  end

  # DELETE /products/1
  def destroy
    @offer.destroy
  end

  private

  def setup_offer
    @offer = Offer.find(params[:id])
  end

  def offers_params
    params
        .require(:offer)
        .permit( :name, :advertiser, :price, :payout)
  end
end
