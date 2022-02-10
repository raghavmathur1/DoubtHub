const dotenv = require("dotenv");
const QuestionSchema = require("../Models/newQuestion");
dotenv.config({
	path: "./utils/config.env",
});

let host = "";
if (process.env.NODE_ENV === "development") {
	host = "http://localhost:3000";
}

exports.addNewQuestion = async (req, res, next) => {
	try {
		new QuestionSchema({
			username: req.body.username,
			heading: req.body.questionHeading,
			description: req.body.description,
		}).save((err, result) => {
			// console.log(result);
			res.send(result);
		});
	} catch (err) {
		res.json(err);
	}
};
exports.getQuestions = async (req, res, next) => {
	try {
		QuestionSchema.find({}, function (err, questions) {
			res.send(questions);
		});
	} catch (err) {
		res.json(err);
	}
};
