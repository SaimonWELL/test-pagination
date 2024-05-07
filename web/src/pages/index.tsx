import Head from "next/head";
import {Inter} from "next/font/google";
import {Alert, Container} from "react-bootstrap";
import {GetServerSideProps, GetServerSidePropsContext} from "next";
import React, {useState} from "react";
import Users from "@/components/Users";
import ComponentPagination from "@/components/Pagination";

const inter = Inter({subsets: ["latin"]});

type TUserItem = {
  id: number
  firstname: string
  lastname: string
  email: string
  phone: string
  updatedAt: string
}

export type TGetServerSideProps = {
  statusCode?: number
  users: TUserItem[]
  usersPerPage?:number
}



export const getServerSideProps = (async (ctx: GetServerSidePropsContext): Promise<{ props: TGetServerSideProps }> => {
  try {
    const res = await fetch("http://localhost:3000/users", {method: 'GET'})
    if (!res.ok) {
      return {props: {statusCode: res.status, users: []}}
    }

    return {
      props: {statusCode: 200, users: await res.json()}
    }
  } catch (e) {
    return {props: {statusCode: 500, users: []}}
  }
}) satisfies GetServerSideProps<TGetServerSideProps>


export default function Home({statusCode, users}: TGetServerSideProps) {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [usersPerPage, setUsersPerPage] = useState(20)
  if (statusCode !== 200) {
    return <Alert variant={'danger'}>Ошибка {statusCode} при загрузке данных</Alert>
  }

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser,indexOfLastUser);

  const paginate = (pageNumber:number):void => setCurrentPage(pageNumber)



  return (
    <>
      <Head>
        <title>Тестовое задание</title>
        <meta name="description" content="Тестовое задание"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <main className={inter.className}>
        <Container>
          <h1 className={'mb-5'}>Пользователи</h1>

          <Users usersPerPage={usersPerPage} users={currentUsers}/>
          <ComponentPagination usersPerPage={usersPerPage} totalUsers={users.length} paginate={paginate}/>
          {/*TODO add pagination*/}

        </Container>
      </main>
    </>
  );
}
