
import Parse from "parse";

export const getTrainers = async () => {
  const Trainer = Parse.Object.extend("Trainer");
  const query = new Parse.Query(Trainer);
  const results = await query.find();
  return results.map((trainer) => ({
    id: trainer.id,
    name: trainer.get("Name"),
    experience: trainer.get("Experience"),
  }));
};

export const createTrainer = async (name, experience) => {
  const Trainer = Parse.Object.extend("Trainer");
  const trainer = new Trainer();
  trainer.set("Name", name);
  trainer.set("Experience", experience);
  return await trainer.save();
};

export const deleteTrainer = async (id) => {
  const Trainer = Parse.Object.extend("Trainer");
  const query = new Parse.Query(Trainer);
  const trainer = await query.get(id);
  return trainer.destroy();
};

