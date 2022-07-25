class CardsController < ApplicationController
  before_action :find_card, only: [:show, :update, :destroy]

  def index
  end
  
  def show
  end

  def create
    # new_card = 
  end

  def update
  end

  def destroy
  end

  private

  def card_params
    params.require(:card).permit(:id, :position_x, :position_y)
  end

  def find_card
    @card = Card.find(params[:id])
  end
end
