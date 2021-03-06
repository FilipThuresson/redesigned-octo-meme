<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;

class ProfileController extends Controller
{
    public function index($id)
    {

        $isFollowing = false;

        if(count(DB::table('user-follow')->where('follow_id', $id)->where('user_id', Session::get('user')[0]->id)->get())==1){
            $isFollowing = true;
        }
        $posts = DB::table('posts')->where('user_id', $id)->orderByDesc('uploaded_at')->get();
        $data = [
            'user' => DB::table('users')->where('id', $id)->get(),
            'posts' => $posts,
            'amountOfFollowers' => count(DB::table('user-follow')->where('follow_id', $id)->get()),
            'amountOfFollowing' => count(DB::table('user-follow')->where('user_id', $id)->get()),
            'amountOfPosts' => count($posts),
            'isFollowing' => $isFollowing
        ];
        return $data;
    }

    public function follow($id){
        if($id == Session::get('user')[0]->id) return abort(403);
        if(count(DB::table('user-follow')->where('follow_id', $id)->where('user_id', Session::get('user')[0]->id)->get())==1){

            DB::table('user-follow')->where('follow_id', $id)->where('user_id', Session::get('user')[0]->id)->delete();
            return [
                'amountOfFollowers' => count(DB::table('user-follow')->where('follow_id', $id)->get()),
                'isFollowing' => false
            ];
        }else{
            DB::table('user-follow')->insert([
                'user_id' => Session::get('user')[0]->id,
                'follow_id' => $id
            ]);
            return [
                'amountOfFollowers' => count(DB::table('user-follow')->where('follow_id', $id)->get()),
                'isFollowing' => true
            ];
        }

    }
    public function edit_pfp(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $imageName = bin2hex(random_bytes(10)). '.' .$request->image->extension();

        $request->image->move(public_path('img'), $imageName);

        DB::table('users')->where('id', Session::get('user')[0]->id)->update([
            'profile_pic' => $imageName
        ]);

        $user = DB::table('users')->where('id', Session::get('user')[0]->id)->get();
        Session::put('user', $user);
        return back();
    }
    public function getFollowers($id)
    {
        $followers = DB::table('user-follow')
        ->join('users', 'users.id', '=', 'user-follow.user_id')
        ->where('follow_id', '=', $id)
        ->get();

        return $followers;
    }

    public function getFollows($id)
    {
        $followers = DB::table('user-follow')
        ->join('users', 'users.id', '=', 'user-follow.follow_id')
        ->where('user_id', '=', $id)
        ->get();

        return $followers;
    }
}
