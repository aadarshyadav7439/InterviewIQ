import { useEffect, useRef, useState } from "react";
import { CheckCircle2, FileText, Upload, X } from "lucide-react";
import { getResume, uploadResume } from "../services/resumeServices";

function Resume() {
  const fileInputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [uploadedResume, setUploadedResume] = useState(null);

  const [loadingResume, setLoadingResume] = useState(true);
  const [uploading, setUploading] = useState(false);

  const [dragActive, setDragActive] = useState(false);

  const [error, setError] = useState("");
  const [uploadError, setUploadError] = useState("");

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const data = await getResume();

        setUploadedResume(data.resume);
      } catch (error) {
        if (error.response?.status !== 404) {
          console.error("Failed to fetch resume:", error);
        }
      } finally {
        setLoadingResume(false);
      }
    };

    fetchResume();
  }, []);

  const handleFile = (selectedFile) => {
    setError("");
    setUploadError("");

    if (!selectedFile) return;

    if (selectedFile.type !== "application/pdf") {
      setError("Please upload a PDF file.");
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5 MB.");
      return;
    }

    setFile(selectedFile);
  };

  const handleFileChange = (event) => {
    handleFile(event.target.files?.[0]);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragActive(false);

    handleFile(event.dataTransfer.files?.[0]);
  };

  const handleUpload = async () => {
    if (!file || uploading) return;

    try {
      setUploading(true);
      setUploadError("");

      const data = await uploadResume(file);

      setUploadedResume(data.resume);
    } catch (error) {
      console.error(error);

      setUploadError(
        error.response?.data?.message ||
          "Failed to upload resume. Please try again.",
      );
    } finally {
      setUploading(false);
    }
  };

  const removeFile = () => {
    setFile(null);
    setError("");
    setUploadError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  if (loadingResume) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-[#013364]" />

          <p className="mt-4 text-sm text-gray-500">Loading your resume...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl">
      {/* PAGE HEADER */}

      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#013364]">
          Resume
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
          Build a stronger resume.
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500">
          Upload your resume and prepare it for smarter, more personalized
          interview preparation.
        </p>
      </div>

      {/* UPLOAD CARD */}

      <section className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
        <div className="mb-6">
          <h2 className="text-lg font-semibold tracking-tight text-gray-950">
            {uploadedResume ? "Your current resume" : "Upload your resume"}
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {uploadedResume
              ? "Your resume is stored securely and ready for analysis."
              : "Upload your latest resume as a PDF. Maximum file size is 5 MB."}
          </p>
        </div>

        {/* EXISTING RESUME */}

        {uploadedResume && !file && (
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex min-w-0 items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white text-[#013364] shadow-sm">
                  <FileText size={22} strokeWidth={1.8} />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-gray-900">
                    {uploadedResume.fileName}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">PDF</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex w-fit items-center rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:border-[#013364]/30 hover:bg-gray-50"
              >
                <Upload size={15} className="mr-2" />
                Replace Resume
              </button>
            </div>

            <div className="mt-5 flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
              <CheckCircle2 size={17} />
              Resume uploaded successfully
            </div>
          </div>
        )}

        {/* UPLOAD / SELECT AREA */}

        {!uploadedResume && !file && (
          <div
            onDragOver={(event) => {
              event.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`flex min-h-[300px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 text-center transition ${
              dragActive
                ? "border-[#013364] bg-[#013364]/5"
                : "border-gray-300 bg-gray-50 hover:border-[#013364]/40 hover:bg-[#013364]/3"
            }`}
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#013364] shadow-sm">
              <Upload size={23} strokeWidth={1.8} />
            </div>

            <h3 className="mt-5 text-base font-semibold text-gray-900">
              Drop your resume here
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              or click to browse from your computer
            </p>

            <span className="mt-4 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-500">
              PDF • Max 5 MB
            </span>
          </div>
        )}

        {/* SELECTED FILE */}

        {file && (
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex min-w-0 items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white text-[#013364] shadow-sm">
                  <FileText size={22} strokeWidth={1.8} />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-gray-900">
                    {file.name}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    PDF • {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={removeFile}
                className="inline-flex w-fit items-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
              >
                <X size={15} className="mr-1.5" />
                Remove
              </button>
            </div>

            <div className="mt-5 flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              <CheckCircle2 size={16} />
              Resume selected and ready to upload.
            </div>

            <button
              type="button"
              onClick={handleUpload}
              disabled={uploading}
              className="mt-5 inline-flex items-center rounded-lg bg-[#013364] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#081f38] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Upload size={16} className="mr-2" />

              {uploading ? "Uploading..." : "Upload Resume"}
            </button>
          </div>
        )}

        {/* FILE INPUT */}

        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf,.pdf"
          onChange={handleFileChange}
          className="hidden"
        />

        {/* VALIDATION ERROR */}

        {error && (
          <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* UPLOAD ERROR */}

        {uploadError && (
          <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {uploadError}
          </div>
        )}
      </section>

      {/* WHAT HAPPENS NEXT */}

      <section className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#013364]/6 text-[#013364]">
            <Upload size={17} />
          </div>

          <h3 className="mt-4 text-sm font-semibold text-gray-900">Upload</h3>

          <p className="mt-1 text-sm leading-6 text-gray-500">
            Upload your latest resume securely.
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#013364]/6 text-[#013364]">
            <FileText size={17} />
          </div>

          <h3 className="mt-4 text-sm font-semibold text-gray-900">Analyze</h3>

          <p className="mt-1 text-sm leading-6 text-gray-500">
            InterviewIQ extracts useful information from your resume.
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#013364]/6 text-[#013364]">
            <CheckCircle2 size={17} />
          </div>

          <h3 className="mt-4 text-sm font-semibold text-gray-900">Prepare</h3>

          <p className="mt-1 text-sm leading-6 text-gray-500">
            Use your resume data for personalized interview preparation.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Resume;
