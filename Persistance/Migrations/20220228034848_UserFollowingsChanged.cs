using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistance.Migrations
{
    public partial class UserFollowingsChanged : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Followings_AspNetUsers_ObserverId",
                table: "Followings");

            migrationBuilder.DropForeignKey(
                name: "FK_Followings_AspNetUsers_TargetId",
                table: "Followings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Followings",
                table: "Followings");

            migrationBuilder.RenameTable(
                name: "Followings",
                newName: "UserFollowings");

            migrationBuilder.RenameIndex(
                name: "IX_Followings_TargetId",
                table: "UserFollowings",
                newName: "IX_UserFollowings_TargetId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserFollowings",
                table: "UserFollowings",
                columns: new[] { "ObserverId", "TargetId" });

            migrationBuilder.AddForeignKey(
                name: "FK_UserFollowings_AspNetUsers_ObserverId",
                table: "UserFollowings",
                column: "ObserverId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserFollowings_AspNetUsers_TargetId",
                table: "UserFollowings",
                column: "TargetId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserFollowings_AspNetUsers_ObserverId",
                table: "UserFollowings");

            migrationBuilder.DropForeignKey(
                name: "FK_UserFollowings_AspNetUsers_TargetId",
                table: "UserFollowings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserFollowings",
                table: "UserFollowings");

            migrationBuilder.RenameTable(
                name: "UserFollowings",
                newName: "Followings");

            migrationBuilder.RenameIndex(
                name: "IX_UserFollowings_TargetId",
                table: "Followings",
                newName: "IX_Followings_TargetId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Followings",
                table: "Followings",
                columns: new[] { "ObserverId", "TargetId" });

            migrationBuilder.AddForeignKey(
                name: "FK_Followings_AspNetUsers_ObserverId",
                table: "Followings",
                column: "ObserverId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Followings_AspNetUsers_TargetId",
                table: "Followings",
                column: "TargetId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
