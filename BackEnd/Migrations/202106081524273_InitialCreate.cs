namespace BackEnd.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialCreate : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Segments",
                c => new
                    {
                        SegmentId = c.Int(nullable: false, identity: true),
                        SegmentName = c.String(),
                        SegmentDescription = c.String(),
                        SegmentStatus = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.SegmentId);
            
            CreateTable(
                "dbo.Exercises",
                c => new
                    {
                        ExerciseId = c.Int(nullable: false, identity: true),
                        SegmentId = c.Int(nullable: false),
                        ExerciseName = c.String(),
                        ExerciseDescription = c.String(),
                        ExerciseStatus = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.ExerciseId)
                .ForeignKey("dbo.Segments", t => t.SegmentId, cascadeDelete: true)
                .Index(t => t.SegmentId);
            
            CreateTable(
                "dbo.Tasks",
                c => new
                    {
                        TaskId = c.Int(nullable: false, identity: true),
                        ExerciseId = c.Int(nullable: false),
                        TaskName = c.String(),
                        TaskDescription = c.String(),
                        TaskStatus = c.Boolean(nullable: false),
                        TaskPosition = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.TaskId)
                .ForeignKey("dbo.Exercises", t => t.ExerciseId, cascadeDelete: true)
                .Index(t => t.ExerciseId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Tasks", "ExerciseId", "dbo.Exercises");
            DropForeignKey("dbo.Exercises", "SegmentId", "dbo.Segments");
            DropIndex("dbo.Tasks", new[] { "ExerciseId" });
            DropIndex("dbo.Exercises", new[] { "SegmentId" });
            DropTable("dbo.Tasks");
            DropTable("dbo.Exercises");
            DropTable("dbo.Segments");
        }
    }
}
