using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistance.Migrations
{
    public partial class FlattenedTagsOnActivity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Tags",
                table: "Activities",
                type: "text",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Activities_Title_Description",
                table: "Activities",
                columns: new[] { "Title", "Description" })
                .Annotation("Npgsql:IndexMethod", "GIN")
                .Annotation("Npgsql:TsVectorConfig", "english");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Activities_Title_Description",
                table: "Activities");

            migrationBuilder.DropColumn(
                name: "Tags",
                table: "Activities");
        }
    }
}
