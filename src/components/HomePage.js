import React from 'react';

function HomePage({ numQuestions, setNumQuestions, startExam, maxQuestions }) {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Kubernetes Security KCSA Mock Exam</h1>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of questions:
              <input
                type="number"
                value={numQuestions}
                onChange={(e) => setNumQuestions(Math.max(1, Math.min(maxQuestions, parseInt(e.target.value) || 0)))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </label>
          </div>
          <button
            onClick={startExam}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Start Exam
          </button>
        </div>
        
        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-2xl font-bold text-gray-900">About the Creator</h2>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Name</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">Thiago S Shimada Ramos</dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Bio</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  Cloud Native BizDevOps | Solutions Engineer | Global Volunteer Advocate | Speaker | Tech Community Leader | Blogger
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">About</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <p>I'm Thiago, an ICT developer who loves technology, specifically cloud-native applications.</p>
                  <p className="mt-2">I started coding in high school with assembly language. Even if life took me in other directions, those early days fostered a lifelong interest in computers and programming. 💻</p>
                  <p className="mt-2">With over a decade of tech expertise, I've explored many technologies, but Kubernetes is my current focus. My international upbringing—born in Brazil, spent years in Japan, and now in Australia—has profoundly impacted my approach to technology and problem-solving. 🌏</p>
                  <p className="mt-2">I co-host a Kubernetes User Group to discuss and demystify container orchestration. 👨‍💻</p>
                  <p className="mt-2">When I'm not working, playing Go and solving magic cubes improve my strategic thinking and problem-solving skills. These hobbies not only offer a mental escape but also enhance my technical abilities, which I apply in my day-to-day. 🧠</p>
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Links</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <div className="flex space-x-4">
                    <a href="http://thiago4go.github.io/" className="text-blue-600 hover:text-blue-800 flex items-center">
                      Blog
                    </a>
                    <a href="https://www.linkedin.com/in/thiagoshimada/" className="text-blue-600 hover:text-blue-800 flex items-center">
                      LinkedIn
                    </a>
                    <a href="https://github.com/thiago4go" className="text-blue-600 hover:text-blue-800 flex items-center">
                      GitHub
                    </a>
                  </div>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-2xl font-bold text-gray-900">Community Involvement</h2>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Cloud Native Melbourne</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <p>Chapter organiser for Cloud Native Melbourne, an official CNCF community group.</p>
                  <a href="https://community.cncf.io/cloud-native-melbourne/" className="text-blue-600 hover:text-blue-800">
                    Visit Cloud Native Melbourne
                  </a>
                  <div className="mt-2">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/yamljson-lj2aTJhd3a9ui4btKFBp3GeqODqXbP.png"
                      alt="Cloud Native Melbourne Logo"
                      className="w-48 h-48 object-contain rounded-lg"
                    />
                  </div>
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">K8SUG</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <p>Global Volunteer Advocate and Co-host for K8SUG - the Most Active K8s + AI Meetup</p>
                  <a href="https://www.linkedin.com/company/k8sug/" className="text-blue-600 hover:text-blue-800">
                    Visit K8SUG on LinkedIn
                  </a>
                  <div className="mt-2">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo%20k8sug-0pxBTWRLP0tcRUimu7hsY4JHEhv2ca.png"
                      alt="K8SUG Logo"
                      className="w-48 h-48 object-contain rounded-lg"
                    />
                  </div>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;