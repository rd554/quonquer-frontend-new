import Layout from "../../components/Layout";
import Private from "../../components/auth/Private";
import Link from "next/link";

const UserIndex = () => {
  return (
    <Layout>
      <Private>
        <div>
          <div className="pt-4 px-12 mt-6">
            <table className="table-auto w-full bg-white">
              <thead>
                <tr>
                  <td className="border shadow-md text-center text-blue-400 text-md px-8 py-2">
                    <Link href="/user/update">
                      <a>Update Profile</a>
                    </Link>
                  </td>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      </Private>
    </Layout>
  );
};

export default UserIndex;
