class CreateBands < ActiveRecord::Migration[6.0]
  def change
    create_table :bands do |t|
      t.string :name
      t.integer :guitarist_id, foreign_key: true
      t.integer :bassist_id, foreign_key: true
      t.integer :pianist_id, foreign_key: true
      t.integer :drummer_id, foreign_key: true
      t.integer :singer_id, foreign_key: true
    end
  end
end
