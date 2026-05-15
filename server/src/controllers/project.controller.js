const Project = require('../models/project.model');

const createProject = async (req, res) => {
    try {
        const { title, description, thumbnail, techStack, githubLink, liveLink } = req.body;

        const project = await Project.create({
            owner: req.user.id,
            title,
            description,
            thumbnail,
            techStack,
            githubLink,
            liveLink
        });

        res.status(201).json(project);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getMyProjects = async (req, res) => {
    try {
        const projects = await Project.find({ owner: req.user.id }).sort({ createdAt: -1 });
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }


        if (project.owner.toString() !== req.user.id) {
            return res.status(401).json({ message: "User not authorized" });
        }

        await project.deleteOne();
        res.json({ message: "Project removed successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        if (project.owner.toString() !== req.user.id) {
            return res.status(401).json({ message: "User not authorized" });
        }

        const updatedProject = await Project.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        res.json(updatedProject);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllProjects = async (req, res) => {
    try {
        const { search, tech } = req.query;
        let query = {};

        if (search) {
            query.title = { $regex: search, $options: 'i' };
        }

        if (tech) {
            query.techStack = { $in: [new RegExp(tech, 'i')] };
        }

        const projects = await Project.find(query)
            .populate("owner", "name profilePicture")
            .sort({ createdAt: -1 });

        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { 
    createProject, 
    getMyProjects, 
    deleteProject, 
    updateProject,
    getAllProjects
};