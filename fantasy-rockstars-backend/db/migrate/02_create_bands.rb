class CreateBands < ActiveRecord::Migration[6.0]
  def change
    create_table :bands do |t|
      t.string :name
      t.references :band_member, foreign_key: true
    end
  end
end
