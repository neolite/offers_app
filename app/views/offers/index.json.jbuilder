json.array!(@offers) do |offer|
  json.extract! offer, :id, :name, :advertiser, :payout
end