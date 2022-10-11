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

export default async function cohortsHandler(req, res) {
  if (req.method === "GET") {
    try {
      const cohorts = await sql`
      SELECT * FROM cohorts`;
      res.status(200).json({ cohorts });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "Messed up on our end" });
    }
  } else if (req.method === "POST") {
    try {
      const {
        cohort,
        begin_date,
        end_date,
        instructor,
        cohort_avg,
        cohort_min,
        cohort_max,
        ASANA_GID,
      } = req.body;

      const createCohort = await sql`
               INSERT INTO cohorts ( 
                cohort,
                begin_date,
                end_date,
                instructor,
                cohort_avg,
                cohort_min,
                cohort_max,
                ASANA_GID
                )
               VALUES (${cohort}, ${begin_date}, ${end_date}, ${instructor}, ${cohort_avg}, ${cohort_min}, ${cohort_max}, ${ASANA_GID}) 
               RETURNING *`;
      res.status(200).json({ createCohort });
    } catch (error) {
      console.error("Bad news in index api: ", error);
      return res.status(500).json({ msg: "Messed up on our end" });
    }
  } else {
    res.status(400).json({ msg: "You messed up" });
  }
}
