"use client"

import AppBackground from "@/components/shared/app-background"

import FuturisticLoader from "@/components/loaders/page-loader"

import {
    useProfile,
} from "../hooks/use-profile"

import ProfileHero from "./profile-hero"

import ProfileActions from "./profile-actions"

import ProfileStatus from "./profile-status"

import ProfileAbout from "./profile-about"

import ProfileSkills from "./profile-skills"

import ProfileResume from "./profile-resume"

export default function ProfilePage() {

    const {
        data,
        isLoading,
    } = useProfile()

    if (isLoading) {
        return <FuturisticLoader />
    }

    if (!data) {
        return null
    }

    return (

        <AppBackground>

            <section className="relative min-h-screen overflow-hidden px-4 py-8 sm:px-6 lg:px-8">

                {/* PAGE CONTAINER */}

                <div className="mx-auto max-w-7xl space-y-8">

                    {/* HERO */}

                    <ProfileHero
                        user={data}
                    />

                    {/* SECTION 1 */}

                    <div className="grid gap-8 xl:grid-cols-2">

                        {/* ABOUT */}

                        <div className="h-full">

                            <ProfileAbout
                                user={data}
                            />
                        </div>

                        {/* STATUS */}

                        <div className="h-full xl:sticky xl:top-24">

                            <ProfileStatus
                                user={data}
                            />
                        </div>
                    </div>

                    {/* SECTION 2 */}

                    <div className="grid gap-8 xl:grid-cols-2">

                        {/* SKILLS */}

                        <div className="h-full">

                            <ProfileSkills
                                user={data}
                            />
                        </div>

                        {/* ACTIONS */}

                        <div className="h-full xl:sticky xl:top-24">

                            <ProfileActions
                                user={data}
                            />
                        </div>
                    </div>

                    {/* SECTION 3 */}

                    <div>

                        <ProfileResume
                            user={data}
                        />
                    </div>
                </div>
            </section>
        </AppBackground>
    )
}