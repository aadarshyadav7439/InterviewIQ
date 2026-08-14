import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../services/profileServices";
import { useAuth } from "../context/AuthContext";

function Profile() {
  const { updateUser } = useAuth();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile();
        setProfile(response.user);
      } catch (error) {
        console.error(error);
        setError(error.response?.data?.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSkillsChange = (event) => {
    setProfile((prev) => ({
      ...prev,
      skills: event.target.value
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean),
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");
      setMessage("");

      const updateData = {
        name: profile.name,
        avatar: profile.avatar,
        college: profile.college,
        degree: profile.degree,
        branch: profile.branch,
        graduationYear: profile.graduationYear,
        skills: profile.skills,
        targetCompany: profile.targetCompany,
        targetRole: profile.targetRole,
      };

      const response = await updateProfile(updateData);

      setProfile(response.user);
      updateUser(response.user);
      setMessage("Profile updated successfully");
    } catch (error) {
      console.error(error);
      setError(
        error.response?.data?.message || "Failed to update profile"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-[#fafafa]">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-[#013364]" />
          <p className="mt-4 text-sm text-gray-500">
            Loading your profile...
          </p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-[#fafafa] px-4">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-xl font-semibold text-gray-950">
            Profile unavailable
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            {error || "We couldn't load your profile."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-[#fafafa] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">

        {/* PAGE HEADER */}

        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#013364]">
            Your profile
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
            Personalize your InterviewIQ experience
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500">
            Keep your background, skills, and career goals up to date so your
            interview preparation can be more personalized.
          </p>
        </div>

        {/* STATUS MESSAGES */}

        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {message && (
          <div className="mb-6 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* PERSONAL INFORMATION */}

          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-7">

            <div className="mb-6">
              <h2 className="text-xl font-semibold tracking-tight text-gray-950">
                Personal information
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Basic information about you and your academic background.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">

              {/* NAME */}

              <div>
                <label
                  htmlFor="profile-name"
                  className="mb-2 block text-sm font-medium text-gray-800"
                >
                  Full name
                </label>

                <input
                  id="profile-name"
                  name="name"
                  type="text"
                  value={profile.name || ""}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#013364] focus:ring-1 focus:ring-[#013364]/10"
                />
              </div>

              {/* EMAIL */}

              <div>
                <label
                  htmlFor="profile-email"
                  className="mb-2 block text-sm font-medium text-gray-800"
                >
                  Email
                </label>

                <input
                  id="profile-email"
                  name="email"
                  type="email"
                  value={profile.email || ""}
                  disabled
                  className="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-500 outline-none"
                />

                <p className="mt-2 text-xs text-gray-400">
                  Your email address cannot be changed here.
                </p>
              </div>

              {/* COLLEGE */}

              <div>
                <label
                  htmlFor="profile-college"
                  className="mb-2 block text-sm font-medium text-gray-800"
                >
                  College / University
                </label>

                <input
                  id="profile-college"
                  name="college"
                  type="text"
                  value={profile.college || ""}
                  onChange={handleChange}
                  placeholder="e.g. Delhi University"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#013364] focus:ring-1 focus:ring-[#013364]/10"
                />
              </div>

              {/* DEGREE */}

              <div>
                <label
                  htmlFor="profile-degree"
                  className="mb-2 block text-sm font-medium text-gray-800"
                >
                  Degree
                </label>

                <input
                  id="profile-degree"
                  name="degree"
                  type="text"
                  value={profile.degree || ""}
                  onChange={handleChange}
                  placeholder="e.g. B.Tech"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#013364] focus:ring-1 focus:ring-[#013364]/10"
                />
              </div>

              {/* BRANCH */}

              <div>
                <label
                  htmlFor="profile-branch"
                  className="mb-2 block text-sm font-medium text-gray-800"
                >
                  Branch / Specialization
                </label>

                <input
                  id="profile-branch"
                  name="branch"
                  type="text"
                  value={profile.branch || ""}
                  onChange={handleChange}
                  placeholder="e.g. Computer Science"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#013364] focus:ring-1 focus:ring-[#013364]/10"
                />
              </div>

              {/* GRADUATION YEAR */}

              <div>
                <label
                  htmlFor="profile-graduation"
                  className="mb-2 block text-sm font-medium text-gray-800"
                >
                  Graduation year
                </label>

                <input
                  id="profile-graduation"
                  name="graduationYear"
                  type="number"
                  value={profile.graduationYear || ""}
                  onChange={handleChange}
                  placeholder="e.g. 2027"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#013364] focus:ring-1 focus:ring-[#013364]/10"
                />
              </div>
            </div>
          </section>

          {/* CAREER PREFERENCES */}

          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-7">

            <div className="mb-6">
              <h2 className="text-xl font-semibold tracking-tight text-gray-950">
                Career preferences
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Tell InterviewIQ what kind of opportunities you are preparing
                for.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">

              {/* TARGET COMPANY */}

              <div>
                <label
                  htmlFor="profile-company"
                  className="mb-2 block text-sm font-medium text-gray-800"
                >
                  Target company
                </label>

                <input
                  id="profile-company"
                  name="targetCompany"
                  type="text"
                  value={profile.targetCompany || ""}
                  onChange={handleChange}
                  placeholder="e.g. Google, Microsoft, Amazon"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#013364] focus:ring-1 focus:ring-[#013364]/10"
                />
              </div>

              {/* TARGET ROLE */}

              <div>
                <label
                  htmlFor="profile-role"
                  className="mb-2 block text-sm font-medium text-gray-800"
                >
                  Target role
                </label>

                <input
                  id="profile-role"
                  name="targetRole"
                  type="text"
                  value={profile.targetRole || ""}
                  onChange={handleChange}
                  placeholder="e.g. Software Engineer"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#013364] focus:ring-1 focus:ring-[#013364]/10"
                />
              </div>

              {/* SKILLS */}

              <div className="md:col-span-2">
                <label
                  htmlFor="profile-skills"
                  className="mb-2 block text-sm font-medium text-gray-800"
                >
                  Skills
                </label>

                <input
                  id="profile-skills"
                  name="skills"
                  type="text"
                  value={(profile.skills || []).join(", ")}
                  onChange={handleSkillsChange}
                  placeholder="e.g. React, Node.js, MongoDB, Java"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#013364] focus:ring-1 focus:ring-[#013364]/10"
                />

                <p className="mt-2 text-xs text-gray-400">
                  Separate skills with commas.
                </p>
              </div>
            </div>
          </section>

          {/* SAVE */}

          <div className="flex justify-end pb-4">
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-[#013364] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#081f38] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default Profile;