# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "band_members", force: :cascade do |t|
    t.string "name"
    t.string "original_band"
    t.string "instrument"
    t.integer "skill_points"
  end

  create_table "bands", force: :cascade do |t|
    t.string "name"
    t.integer "guitarist_id"
    t.integer "bassist_id"
    t.integer "pianist_id"
    t.integer "drummer_id"
    t.integer "singer_id"
  end

end
