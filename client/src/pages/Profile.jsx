import { useEffect, useState } from "react";
import {
  BriefcaseBusiness,
  GraduationCap,
  Mail,
  Save,
  UserCircle,
} from "lucide-react";
import { getProfile, updateProfile } from "../services/profileServices";
import { useAuth } from "../context/AuthContext";
import avatar1 from "../assets/avatars/avatar-1.svg";
import avatar2 from "../assets/avatars/avatar-2.svg";
import avatar3 from "../assets/avatars/avatar-3.svg";
import avatar4 from "../assets/avatars/avatar-4.svg";
import avatar5 from "../assets/avatars/avatar-5.svg";
import avatar6 from "../assets/avatars/avatar-6.svg";
import avatar7 from "../assets/avatars/avatar-7.svg";
import avatar8 from "../assets/avatars/avatar-8.svg";

const inputClassName =
  "w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#013364] focus:ring-1 focus:ring-[#013364]/10";
const avatars = [
  { id: "avatar-1", image: avatar1 },
  { id: "avatar-2", image: avatar2 },
  { id: "avatar-3", image: avatar3 },
  { id: "avatar-4", image: avatar4 },
  { id: "avatar-5", image: avatar5 },
  { id: "avatar-6", image: avatar6 },
  { id: "avatar-7", image: avatar7 },
  { id: "avatar-8", image: avatar8 },
];
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

        setProfile({
          ...response.user,
          skills: Array.isArray(response.user.skills)
            ? response.user.skills.join(", ")
            : response.user.skills || "",
        });
      } catch (error) {
        console.error(error);
        setError(error.response?.data?.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const selectedAvatar = avatars.find(
    (avatar) => avatar.id === profile?.avatar,
  );

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
      skills: event.target.value,
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
        skills: Array.isArray(profile.skills)
          ? profile.skills
          : profile.skills
              .split(",")
              .map((skill) => skill.trim())
              .filter(Boolean),
        targetCompany: profile.targetCompany,
        targetRole: profile.targetRole,
      };

      const response = await updateProfile(updateData);

      setProfile(response.user);
      updateUser(response.user);
      setMessage("Profile updated successfully");
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-[#013364]" />

          <p className="mt-4 text-sm text-gray-500">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
            <UserCircle size={24} />
          </div>

          <h1 className="mt-4 text-xl font-semibold text-gray-950">
            Profile unavailable
          </h1>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            {error || "We couldn't load your profile."}
          </p>
        </div>
      </div>
    );
  }

  const initials =
    profile.name
      ?.split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join("") || "A";

  return (
    <div className="mx-2 max-w-6xl">
      {/* PAGE HEADER */}

      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#013364]">
          Account
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
          Your profile
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500">
          Keep your background, skills, and career goals up to date so
          InterviewIQ can personalize your preparation.
        </p>
      </div>

      {/* PROFILE SUMMARY */}

      <section className="mb-6 rounded-2xl border border-green-600 bg-white p-6 sm:p-7">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          {/* Avatar */}

          <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#013364] text-xl font-semibold text-white">
            {selectedAvatar ? (
              <img
                src={selectedAvatar.image}
                alt={`${profile.name}'s avatar`}
                className="h-full w-full object-cover"
              />
            ) : (
              initials
            )}
          </div>

          {/* Identity */}

          <div className="min-w-0 flex-1">
            <h2 className="truncate text-3xl font-semibold tracking-tight text-gray-950">
              {profile.name || "Your name"}
            </h2>

            <div className="mt-2 flex flex-col gap-1.5 text-sm text-gray-500 sm:flex-row sm:items-center sm:gap-4">
              <span className="flex items-center gap-1.5">
                <Mail size={14} />
                {profile.email}
              </span>

              {profile.targetRole && (
                <span className="flex items-center gap-1.5">
                  <BriefcaseBusiness size={14} />
                  {profile.targetRole}
                </span>
              )}
            </div>
          </div>

          {/* Status */}

          <div className="hidden rounded-lg border border-gray-400 bg-gray-50 px-4 py-3 sm:block">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-500">
              Profile status
            </p>

            <p className="mt-1 text-sm font-medium text-gray-900">
              Keep it updated
            </p>
          </div>
        </div>
      </section>

      {/* STATUS */}

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

        <section className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-7">
          <div className="mb-6 flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#013364]/6 text-[#013364]">
              <UserCircle size={18} strokeWidth={1.8} />
            </div>

            <div>
              <h2 className="text-lg font-semibold tracking-tight text-gray-950">
                Personal information
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Your basic details and academic background.
              </p>
            </div>
          </div>

          {/* AVATAR SELECTION */}

          <div className="mb-7 rounded-xl border border-gray-200 bg-gray-50/70 p-4 sm:p-5">
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-gray-900">
                Choose your avatar
              </h3>

              <p className="mt-1 text-xs leading-5 text-gray-500">
                Pick an avatar that represents you across InterviewIQ.
              </p>
            </div>

            <div className="grid grid-cols-4 gap-3 sm:grid-cols-8">
              {avatars.map((avatar) => {
                const isSelected = profile.avatar === avatar.id;

                return (
                  <button
                    key={avatar.id}
                    type="button"
                    onClick={() =>
                      setProfile((prev) => ({
                        ...prev,
                        avatar: avatar.id,
                      }))
                    }
                    className={`relative aspect-square overflow-hidden rounded-full transition ${
                      isSelected
                        ? "ring-3 ring-[#013364] ring-offset-2"
                        : "opacity-80 hover:scale-105 hover:opacity-100"
                    }`}
                    aria-label={`Select ${avatar.id}`}
                  >
                    <img
                      src={avatar.image}
                      alt=""
                      className="h-full w-full object-cover"
                    />

                    {isSelected && (
                      <span className="absolute inset-0 bg-[#013364]/10" />
                    )}
                  </button>
                );
              })}
            </div>
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
                className={inputClassName}
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
                className={inputClassName}
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
                className={inputClassName}
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
                className={inputClassName}
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
                className={inputClassName}
              />
            </div>
          </div>
        </section>

        {/* CAREER PREFERENCES */}

        <section className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-7">
          <div className="mb-6 flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#013364]/6 text-[#013364]">
              <GraduationCap size={18} strokeWidth={1.8} />
            </div>

            <div>
              <h2 className="text-lg font-semibold tracking-tight text-gray-950">
                Career preferences
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Tell InterviewIQ what opportunities you are preparing for.
              </p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {/* COMPANY */}

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
                className={inputClassName}
              />
            </div>

            {/* ROLE */}

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
                className={inputClassName}
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
                value={profile.skills || ""}
                onChange={handleSkillsChange}
                placeholder="e.g. React, Node.js, MongoDB, Java"
                className={inputClassName}
              />

              <p className="mt-2 text-xs text-gray-400">
                Separate skills with commas.
              </p>
            </div>
          </div>
        </section>

        {/* SAVE */}

        <div className="flex flex-col-reverse gap-3 pb-4 sm:flex-row sm:items-center sm:justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center justify-center rounded-lg bg-[#013364] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#081f38] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Save size={16} className="mr-2" />

            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Profile;
