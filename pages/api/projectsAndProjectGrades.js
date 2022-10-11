import postgres from "postgres";

// const { DB_CONNECTION_URL, PORT, NODE_ENV } = process.env;
const sql = postgres(
  process.env.DB_CONNECTION_URL,
  process.env.NODE_ENV === "production"
    ? {
        ssl: { rejectUnauthorized: false },
        // max_lifetime: 60 * 30,
      }
    : {}
);

export default async function getProjectsAndProjectGrades(req, res) {
  if (req.method === "GET") {
    try {
      const projectsAndProjectGrades = await sql`
      SELECT * FROM projects INNER JOIN project_grades ON projects.project_id = project_grades.project_id`;
      res.status(200).json({ projectsAndProjectGrades });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "Messed up on our end" });
    }
  } else {
    res.status(400).json({ msg: "You messed up" });
  }
}
