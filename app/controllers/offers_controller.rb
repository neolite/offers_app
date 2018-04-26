# frozen_string_literal: true

class OffersController < ApplicationController
  layout 'offers'
  before_action :set_offer, only: [:update, :destroy]

  def index
    @offers = Offer.order(created_at: :desc).all
    @component_props = { offers: @offers }
    respond_to do |format|
      format.html
      format.json { render :json => @offers }
    end
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

  def set_offer
    @offer = Offer.find(params[:id])
  end

  def offers_params
    params
        .require(:offer)
        .permit( :name, :advertiser, :price, :payout)
  end
end
