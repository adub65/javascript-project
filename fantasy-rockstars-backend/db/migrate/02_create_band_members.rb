class CreateBandMembers < ActiveRecord::Migration[6.0]
  def change
    create_table :band_members do |t|
      t.string :name
      t.string :original_band
      t.string :instrument
      t.integer :skill_points
      t.references :band, foreign_key: true
      t.timestamps
    end
  end
end
