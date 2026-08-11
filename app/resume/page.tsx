import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resume | Tobi Marais',
  robots: { index: false, follow: false },
};

const RESUME_PDF_PATH = '/files/dirk-resume.pdf';

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900/20 py-12 px-6 flex flex-col items-center">
      <div className="w-full max-w-4xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h1 className="text-3xl font-bold text-white">Resume</h1>
          <a
            href={RESUME_PDF_PATH}
            download
            className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-green-500 hover:bg-green-600 text-black font-semibold rounded-lg transition-colors"
          >
            Download PDF
          </a>
        </div>

        <div className="bg-gray-800/50 rounded-2xl overflow-hidden backdrop-blur-sm border border-gray-700">
          <iframe
            src={RESUME_PDF_PATH}
            title="Tobi Marais - Resume"
            className="w-full"
            style={{ height: '85vh' }}
          />
        </div>

        <p className="text-gray-400 text-sm mt-4 text-center">
          If the preview doesn't load,{' '}
          <a href={RESUME_PDF_PATH} className="text-green-400 hover:underline">
            open the PDF directly
          </a>
          .
        </p>
      </div>
    </div>
  );
}
