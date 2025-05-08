import { PrismaClient, OrderStatus, TaskType, LabelingLanguage } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Create Users
    const [alice, bob] = await Promise.all([
        prisma.user.create({ data: {} }),
        prisma.user.create({ data: {} }),
    ]);

    // Create Orders with Features and include nested features
    const [order1, order2] = await Promise.all([
        prisma.order.create({
            data: {
                name: 'Urban Street Labeling',
                startDate: new Date('2025-05-01'),
                endDate: new Date('2025-06-01'),
                status: OrderStatus.active,
                budget: 1500.0,
                labelingLanguage: LabelingLanguage.en,
                datasetDescription: 'Photos of city streets to identify cars and people',
                exampleImageUrl: 'https://example.com/img/urban1.jpg',
                imageGuidelines: 'Tight boxes around vehicle and pedestrian edges',
                minSamplesCount: 100,
                currentSamplesCount: 25,
                entryFee: 2.5,
                reward: 500,
                minContributors: 5,
                contributors: 2,
                features: {
                    create: [
                        { name: 'Vehicle', labelGuidelines: 'Label all vehicles: cars, buses, trucks.', exampleLabel: 'car' },
                        { name: 'Pedestrian', labelGuidelines: 'Label all visible people walking.', exampleLabel: 'person' },
                    ],
                },
            },
            include: { features: true },
        }),
        prisma.order.create({
            data: {
                name: 'Wildlife Photo Tagging',
                startDate: new Date('2025-04-15'),
                endDate: new Date('2025-05-15'),
                status: OrderStatus.pending,
                budget: 1000.0,
                labelingLanguage: LabelingLanguage.pl,
                datasetDescription: 'Forest camera-trap images for animal species labels',
                exampleImageUrl: 'https://example.com/img/wild1.jpg',
                imageGuidelines: 'Draw boxes around any visible animal',
                minSamplesCount: 200,
                currentSamplesCount: 0,
                entryFee: 1.5,
                reward: 300,
                minContributors: 10,
                contributors: 0,
                features: {
                    create: [
                        { name: 'Deer', labelGuidelines: 'Label deer when visible.', exampleLabel: 'deer' },
                        { name: 'Fox', labelGuidelines: 'Label fox when visible.', exampleLabel: 'fox' },
                        { name: 'Bear', labelGuidelines: 'Label bears when visible.', exampleLabel: 'bear' },
                    ],
                },
            },
            include: { features: true },
        }),
    ]);

    // Create Tasks for order1
    const [labelTask1, checkTask1, pictureTask1] = await Promise.all([
        prisma.task.create({
            data: {
                type: TaskType.labeling,
                endDate: new Date('2025-05-10'),
                estimatedReward: 5.0,
                assignedTo: { connect: { id: alice.id } },
                order: { connect: { id: order1.id } },
                labelTask: {
                    create: {
                        featureLabels: {
                            create: order1.features.map(f => ({
                                feature: { connect: { id: f.id } },
                                featureLabel: f.exampleLabel!,
                            })),
                        },
                    },
                },
            },
        }),
        prisma.task.create({
            data: {
                type: TaskType.cross_checking,
                endDate: new Date('2025-05-12'),
                estimatedReward: 3.0,
                assignedTo: { connect: { id: bob.id } },
                order: { connect: { id: order1.id } },
                checkTask: {
                    create: {
                        isCorrect: true,
                        checkFeatures: {
                            create: order1.features.map(f => ({ name: f.name, label: f.exampleLabel! })),
                        },
                    },
                },
            },
        }),
        prisma.task.create({
            data: {
                type: TaskType.taking_picture,
                endDate: new Date('2025-05-20'),
                estimatedReward: 4.0,
                assignedTo: { connect: { id: alice.id } },
                order: { connect: { id: order1.id } },
                pictureTask: {
                    create: { exampleImgUrl: 'https://example.com/img/upload1.jpg' },
                },
            },
        }),
    ]);

    // Create Tasks for order2
    const [labelTask2, checkTask2, pictureTask2] = await Promise.all([
        prisma.task.create({
            data: {
                type: TaskType.labeling,
                endDate: new Date('2025-05-05'),
                estimatedReward: 4.5,
                assignedTo: { connect: { id: bob.id } },
                order: { connect: { id: order2.id } },
                labelTask: {
                    create: {
                        featureLabels: {
                            create: order2.features.map(f => ({
                                feature: { connect: { id: f.id } },
                                featureLabel: f.exampleLabel!,
                            })),
                        },
                    },
                },
            },
        }),
        prisma.task.create({
            data: {
                type: TaskType.cross_checking,
                endDate: new Date('2025-05-14'),
                estimatedReward: 2.5,
                assignedTo: { connect: { id: alice.id } },
                order: { connect: { id: order2.id } },
                checkTask: {
                    create: {
                        isCorrect: false,
                        checkFeatures: {
                            create: order2.features.map(f => ({ name: f.name, label: f.exampleLabel! })),
                        },
                    },
                },
            },
        }),
        prisma.task.create({
            data: {
                type: TaskType.taking_picture,
                endDate: new Date('2025-05-18'),
                estimatedReward: 3.5,
                assignedTo: { connect: { id: bob.id } },
                order: { connect: { id: order2.id } },
                pictureTask: {
                    create: { exampleImgUrl: 'https://example.com/img/upload2.jpg' },
                },
            },
        }),
    ]);

    console.log('🌱 Seed data created:');
    console.log({ alice, bob, order1, order2 });
    console.log({ labelTask1, checkTask1, pictureTask1, labelTask2, checkTask2, pictureTask2 });
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
